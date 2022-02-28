const dev = process.argv.includes('--devmode')
import express from 'express'
import cookieParser from 'cookie-parser'

const app = express()

//TODO: import config
//TODO: add DB checker

if (dev) {
    app.use(express.static('./public')) //relative to project root
}

app.use(cookieParser())

const PORT = process.env.PORT || 80

app.listen(PORT, () => {
    console.log('Listening on port ' + PORT)
})
