import { Request, Response } from 'express'

export default async function login(req: Request, res: Response) {
    const isLoggedOut = !req.cookies['state'] || !req.cookies['uname']

    if (!isLoggedOut) return res.redirect('/')

    const state = generateState(16)
    const showDialog = req.query.force === 'true' ? true : false

    const query = new URLSearchParams()
    query.append('state', state)
    query.append('response_type', 'code')
    query.append('client_id', process.env.CLIENT_ID || '')
    query.append('redirect_uri', process.env.REDIRECT_URI || '')
    query.append('scope', process.env.API_SCOPE || '')
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
