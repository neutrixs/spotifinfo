import { Request, Response } from 'express'
import { readFileSync } from 'fs'
import nodeFetch from 'node-fetch'
import recaptchaVerifyType from '../types/recaptchaVerifyType.js'
import config from '../config.js'
import databaseTypes from '../types/databaseTypes.js'

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
    }
}

function getRefreshToken(state: string): string | null {
    const rawDB = readFileSync('./db/data.json', { encoding: 'utf-8' })
    const DB = JSON.parse(rawDB) as databaseTypes

    const currentDB = DB[state]

    if (!currentDB) return null

    return currentDB.refresh_token
}
