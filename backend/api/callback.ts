import axios from 'axios'
import { Request, Response } from 'express'
import { readFileSync, writeFileSync } from 'fs'
import stateInstance from '../instances/state'

import { requestAccessToken } from '../types/spotifyAPITypes.js'
import databaseTypes from '../types/databaseTypes.js'
import spotifyCurrentUser from '../types/spotifyCurrentUser'

const closeWindow = '<script>window.close();</script>'

export default async function callback(req: Request, res: Response) {
    if (req.query['error']) return res.send(closeWindow)
    if (!req.query['code'] || !req.query['state']) return res.status(400).send(closeWindow)

    if (!stateInstance.get(req.query.state as string)) {
        res.status(400).write('mismatched state')
        return res.end()
    }

    const authorization = 'Basic ' + Buffer.from(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64')

    const param = new URLSearchParams()
    param.append('grant_type', 'authorization_code')
    param.append('code', req.query['code'] as string)
    param.append('redirect_uri', process.env.REDIRECT_URI || '')

    const response = await axios({
        url: 'https://accounts.spotify.com/api/token',
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            authorization,
        },
        data: param,
    })

    if (response.status != 200) {
        res.status(response.status)
        res.write(response.status + ' ' + response.statusText)
        res.end()
        return
    }

    const jsonResponse = response.data as requestAccessToken

    if (!stateInstance.isMatch(req.query.state as string, jsonResponse.scope)) {
        res.status(400).write('mismatched scope')
        return res.end()
    }

    writeToDB(req.query['state'] as string, jsonResponse.refresh_token, +new Date())

    /**
     * This username thing is actually no longer needed server side (i will prevent duplication later)
     * This is just to support the web client which still needs it
     */

    const userInfoRequestRaw = await axios({
        url: 'https://api.spotify.com/v1/me',
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + jsonResponse.access_token,
        },
    })

    const userInfo = (await userInfoRequestRaw.data) as spotifyCurrentUser

    const username = userInfo.id

    const expires = new Date(99999999999999)

    res.cookie('uname', username, { expires })
    res.cookie('state', req.query['state'], { expires })
    res.send(`<script>localStorage.setItem('token', '${jsonResponse.access_token}');window.close();</script>`)
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
