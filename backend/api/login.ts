import { Request, Response } from 'express'
import config from '../config.js'

const dev = process.argv.includes('--devmode')
const configMode = dev ? 'dev' : 'prod'
const currentConfig = config[configMode]

export default async function login(req: Request, res: Response) {
    const isLoggedOut = !req.cookies['state'] || !req.cookies['uname']

    if (!isLoggedOut) return res.redirect('/')

    const state = generateState(16)
    const showDialog = req.query.force === 'true' ? true : false

    const query = new URLSearchParams()
    query.append('state', state)
    query.append('response_type', 'code')
    query.append('client_id', currentConfig.client_id)
    query.append('redirect_uri', currentConfig.redirect_uri)
    query.append('scope', currentConfig.scope)
    query.append('show_dialog', showDialog.toString())

    res.redirect('https://accounts.spotify.com/authorize?' + query.toString())
}

function generateState(length: number) {
    const possible = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-'
    const possibleLettersLength = possible.length

    let res = ''

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * possibleLettersLength)
        const letter = possible[randomIndex]

        res += letter
    }

    return res
}
