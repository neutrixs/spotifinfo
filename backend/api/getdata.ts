import { Request, Response } from 'express'
import { readFileSync } from 'fs'
import config from '../config.js'

const dev = process.argv.includes('--devmode')
const currentConfig = config[dev ? 'dev' : 'prod']

export default function getdata(req: Request, res: Response) {
    if (req.headers['authorization'] !== currentConfig.pass) {
        res.status(403).end()
        return
    }

    const data = readFileSync('./db/data.json', { encoding: 'utf-8' })

    res.setHeader('Content-Type', 'application/json')
    res.write(data)
    res.end()
}
