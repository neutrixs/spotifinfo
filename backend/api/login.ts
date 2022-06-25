import { Request, Response } from 'express'
import { readFile } from 'fs/promises'
import stateInstance from '../instances/state'
import databaseType from '../types/databaseTypes'

export default async function login(req: Request, res: Response) {
    const isLoggedOut = !req.cookies['state']

    if (!isLoggedOut) return res.redirect('/')

    const state = await generateState(16)
    const showDialog = req.query.force === 'true' ? true : false

    const query = new URLSearchParams()
    query.append('state', state)
    query.append('response_type', 'code')
    query.append('client_id', process.env.CLIENT_ID || '')
    query.append('redirect_uri', process.env.REDIRECT_URI || '')
    query.append('scope', process.env.API_SCOPE || '')
    query.append('show_dialog', showDialog.toString())

    stateInstance.set(state, process.env.API_SCOPE || '')

    res.redirect('https://accounts.spotify.com/authorize?' + query.toString())
}

async function generateState(length: number) {
    const possible = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-'
    let state = ''

    do {
        let temp = ''

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * possible.length)
            temp += possible[randomIndex]
        }

        state = temp
    } while (await stateIsDuplicate(state))

    return state
}

// the chance of duplicate state to happen is 1 in 5227573613485916806405226496, but just in case 😅
async function stateIsDuplicate(state: string) {
    const rawDatabase = await readFile('./db/data.json', { encoding: 'utf-8' })
    const database = JSON.parse(rawDatabase) as databaseType

    return database[state] !== undefined
}
