import { Request, Response } from 'express'
import { readFileSync } from 'fs'

export default function getdata(req: Request, res: Response) {
    if (req.headers['authorization'] !== process.env.PASS) {
        res.status(403).end()
        return
    }

    const data = readFileSync('./db/data.json', { encoding: 'utf-8' })

    res.setHeader('Content-Type', 'application/json')
    res.write(data)
    res.end()
}
