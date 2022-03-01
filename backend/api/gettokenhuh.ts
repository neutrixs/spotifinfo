import { Request, Response } from 'express'
import { readFileSync } from 'fs'
import nodeFetch from 'node-fetch'
import recaptchaVerifyType from '../types/recaptchaVerifyType.js'
import config from '../config.js'
import databaseTypes from '../types/databaseTypes.js'
import { requestRefreshToken as refreshTokenType } from '../types/spotifyAPITypes.js'

const dev = process.argv.includes('--devmode')
const currentConfig = config[dev ? 'dev' : 'prod']

export default async function getToken(req: Request, res: Response) {
    if (!req.cookies['state'] || !req.body['reCAPTCHAToken']) {
        res.status(401).write('401 Unauthorized')
        res.end()
        return
    }

    // check recaptcha response

    const recaptchaSecret = readFileSync('./SECRET/reCAPTCHASecret.txt', { encoding: 'utf-8' })
    const params = new URLSearchParams()

    params.append('secret', recaptchaSecret)
    params.append('response', req.body['reCAPTCHAToken'])
    params.append('remoteip', req.ip)

    const apiResponse = await nodeFetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        body: params.toString(),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })

    const parsedApiResponse = (await apiResponse.json()) as recaptchaVerifyType

    if (!parsedApiResponse.success) {
        res.status(400).json(parsedApiResponse)
        return
    }

    if (parsedApiResponse.score < 0.5) {
        res.status(403).json({
            success: false,
            'error-codes': ['low-score'],
        })
    }

    // request new token to spotify api

    const refreshToken = getRefreshToken(req.cookies['state'])

    if (!refreshToken) {
        res.status(404).json({
            success: false,
            'error-codes': ['state-not-found'],
            relogback: true,
        })
        return
    }

    const basicAuthorization =
        'Basic ' + Buffer.from(currentConfig.client_id + ':' + currentConfig.client_secret).toString('base64')

    const tokenRefreshBody = new URLSearchParams()
    tokenRefreshBody.append('grant_type', 'refresh_token')
    tokenRefreshBody.append('refresh_token', refreshToken)

    const tokenRefreshRequest = await nodeFetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: basicAuthorization,
        },
        body: tokenRefreshBody.toString(),
    })

    if (tokenRefreshRequest.status !== 200) {
        res.status(404).json({
            success: false,
            relogback: true,
            'error-codes': [],
        })
        return
    }

    const newToken = (await tokenRefreshRequest.json()) as refreshTokenType

    res.json({
        success: true,
        data: {
            token: 'Bearer ' + newToken.access_token,
            validuntil: +new Date() + newToken.expires_in * 1000,
        },
    })
}

function getRefreshToken(state: string): string | null {
    const rawDB = readFileSync('./db/data.json', { encoding: 'utf-8' })
    const DB = JSON.parse(rawDB) as databaseTypes

    const currentDB = DB[state]

    if (!currentDB) return null

    return currentDB.refresh_token
}
