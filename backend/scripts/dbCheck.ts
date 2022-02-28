import { readFileSync, writeFileSync } from 'fs'

export default function dbCheck() {
    try {
        let read = readFileSync('./db/data.json', { encoding: 'utf-8' }) // relative to project root
        JSON.parse(read)
    } catch (e) {
        writeFileSync('./db/data.json', '{}')
    }
}
