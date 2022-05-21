import { Request, Response } from 'express'
import { readFileSync } from 'fs'
import axios from 'axios'
import recaptchaVerifyType from '../types/recaptchaVerifyType.js'
import databaseTypes from '../types/databaseTypes.js'
import { requestRefreshToken as refreshTokenType } from '../types/spotifyAPITypes.js'

export default async function getToken(req: Request, res: Response) {
    if (!req.cookies['state'] || !req.body['reCAPTCHAToken']) {
        res.status(401).write('401 Unauthorized')
        res.end()
        return
    }

    // check recaptcha response

    const recaptchaSecret = process.env.RECAPTCHA_SECRET || ''
    const params = new URLSearchParams()

    params.append('secret', recaptchaSecret)
    params.append('response', req.body['reCAPTCHAToken'])
    params.append('remoteip', req.ip)

    const apiResponse = await axios({
        url: 'https://www.google.com/recaptcha/api/siteverify',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: params.toString(),
    })

    const parsedApiResponse = apiResponse.data as recaptchaVerifyType

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

    getNewToken(res, refreshToken)
}

function getRefreshToken(state: string): string | null {
    const rawDB = readFileSync('./db/data.json', { encoding: 'utf-8' })
    const DB = JSON.parse(rawDB) as databaseTypes

    const currentDB = DB[state]

    if (!currentDB) return null

    return currentDB.refresh_token
}

async function getNewToken(res: Response, refreshToken: string) {
    const authorization = 'Basic ' + Buffer.from(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64')

    const body = new URLSearchParams()
    body.append('grant_type', 'refresh_token')
    body.append('refresh_token', refreshToken)

    // const rawResponse = await nodeFetch('https://accounts.spotify.com/api/token', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded',
    //         authorization,
    //     },
    //     body,
    // })

    const rawResponse = await axios({
        url: 'https://accounts.spotify.com/api/token',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            authorization,
        },
        data: body.toString(),
    })

    if (rawResponse.status < 200 || rawResponse.status > 299) {
        res.status(404).json({
            success: false,
            relogback: true,
            'error-codes': [],
        })
        return
    }

    const newToken = rawResponse.data as refreshTokenType

    res.json({
        success: true,
        data: {
            token: 'Bearer ' + newToken.access_token,
            validuntil: +new Date() + newToken.expires_in * 1000,
        },
    })
}
