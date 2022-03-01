const dev = process.argv.includes('--devmode')
import express from 'express'
import cookieParser from 'cookie-parser'
import { renderFile } from 'ejs'
import dbCheck from './scripts/dbCheck.js'

import loginHandler from './api/login.js'
import callback from './api/callback.js'

const app = express()

dbCheck()

//

if (dev) {
    app.use(express.static('./public')) //relative to project root
}

app.use(cookieParser())
app.engine('html', renderFile)
app.set('view engine', 'html')
app.set('views', './public')

app.get(/^\//, (req, res, next) => {
    switch (req.path) {
        case '/login':
            loginHandler(req, res)
            return
        case '/callback':
            callback(req, res)
            return
    }
    next()
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
