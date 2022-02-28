const dev = process.argv.includes('--devmode')
import express from 'express'
import cookieParser from 'cookie-parser'
import dbCheck from './scripts/dbCheck.js'

import loginHandler from './api/login.js'

const app = express()

dbCheck()

//

if (dev) {
    app.use(express.static('./public')) //relative to project root
}

app.use(cookieParser())

app.get(/^\//, (req, res) => {
    switch (req.path) {
        case '/login':
            loginHandler(req, res)
            return
    }
})

const PORT = process.env.PORT || 80

app.listen(PORT, () => {
    console.log('Listening on port ' + PORT)
})
