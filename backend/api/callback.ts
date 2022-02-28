import nodeFetch from 'node-fetch'
import { Request, Response } from 'express'
import { readFileSync, writeFileSync } from 'fs'
import config from '../config.js'

import { requestAccessToken } from '../types/spotifyAPITypes.js'
import databaseTypes from '../types/databaseTypes.js'
import spotifyCurrentUser from '../../src/types/spotifyCurrentUser'

const dev = process.argv.includes('--devmode')
const currentConfig = config[dev ? 'dev' : 'prod']

export default async function callback(req: Request, res: Response) {
    if (req.query['error']) return res.redirect('/')

    if (!req.query['code'] || !req.query['state']) return res.redirect('/')

    const param = new URLSearchParams()
    param.append('grant_type', 'authorization_code')
    param.append('code', req.query['code'] as string)
    param.append('redirect_uri', currentConfig.redirect_uri)
    param.append('client_id', currentConfig.client_id)
    param.append('client_secret', currentConfig.client_secret)

    const response = await nodeFetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        body: param.toString(),
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
        },
    })

    if (response.status != 200) {
        res.status(response.status)
        res.write(response.status + ' ' + response.statusText)
        res.end()
        return
    }

    const jsonResponse = (await response.json()) as requestAccessToken

    writeToDB(req.query['state'] as string, jsonResponse.refresh_token, +new Date())

    /**
     * This username thing is actually no longer needed server side (i will prevent duplication later)
     * This is just to support the web client which still needs it
     */

    const userInfoRequestRaw = await nodeFetch('https://api.spotify.com/v1/me', {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + jsonResponse.access_token,
        },
    })

    const userInfo = (await userInfoRequestRaw.json()) as spotifyCurrentUser

    const username = userInfo.id

    const expires = new Date(99999999999999)

    res.cookie('uname', username, { expires })
    res.cookie('state', req.query['state'], { expires })
    res.redirect('/')
}

function writeToDB(state: string, refresh_token: string, dateadded: number) {
    const rawDB = readFileSync('./db/data.json', { encoding: 'utf-8' }) // relative to project root
    const DB = JSON.parse(rawDB) as databaseTypes

    DB[state] = {
        refresh_token: refresh_token,
        dateadded: dateadded,
    }

    writeFileSync('./db/data.json', JSON.stringify(DB))
}
