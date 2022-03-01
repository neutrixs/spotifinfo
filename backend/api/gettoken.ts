import { Request, Response } from 'express'
import { readFileSync } from 'fs'
import nodeFetch from 'node-fetch'
import recaptchaVerifyType from '../types/recaptchaVerifyType.js'
import config from '../config.js'

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
}
