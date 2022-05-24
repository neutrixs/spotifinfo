const dev = process.argv.includes('--devmode')
import * as express from 'express'
import { urlencoded } from 'express'
import * as cookieParser from 'cookie-parser'
import { renderFile } from 'ejs'
import dbCheck from './scripts/dbCheck.js'
import checkEnv from './scripts/checkEnv.js'

import loginHandler from './api/login.js'
import callback from './api/callback.js'
import gettokenApi from './api/gettoken.js'
import getdataApi from './api/getdata.js'

checkEnv('API_SCOPE', 'CLIENT_ID', 'CLIENT_SECRET', 'REDIRECT_URI', 'PASS', 'RECAPTCHA_SECRET')
const app = express()

dbCheck()

//

if (dev) {
    app.use(express.static('./public')) //relative to project root
}

app.use(cookieParser())
app.use(urlencoded({ extended: true }))
app.engine('html', renderFile)
app.set('view engine', 'html')
app.set('views', './public')
app.disable('x-powered-by')

app.get(/^\//, (req, res, next) => {
    switch (req.path) {
        case '/api/login':
            loginHandler(req, res)
            return
        case '/api/callback':
            callback(req, res)
            return
    }
    next()
})

app.post('/api/gettoken', (req, res) => {
    gettokenApi(req, res)
})

app.post('/api/getdata', (req, res) => {
    getdataApi(req, res)
})

app.get(/^\//, (req, res) => {
    const actualPath = req.path.replace(/\/+/g, '/')

    switch (actualPath) {
        case '/':
        case '/top_tracks':
        case '/top_tracks/':
        case '/account':
        case '/account/':
        case '/privacy':
        case '/privacy/':
            res.render('meaningOfLife.html')
            return
    }
    res.status(404).render('meaningOfLife.html')
})

const PORT = process.env.PORT || 80

app.listen(PORT, () => {
    console.log('Listening on port ' + PORT)
})

process.on('uncaughtException', e => {
    console.error(e)
})
