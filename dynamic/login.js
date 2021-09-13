const querystring = require('node:querystring')
const checkReCAPTCHA = require('./checkReCAPTCHA')
function generateState(length){
    let possible = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789`~!@#$%^&*()-_=+'
    let state = ''
    let random
    for(i=0;i<length;i++){
        random = Math.floor(Math.random()*possible.length)
        state+=possible[random]
    }
    return state
}

async function login(req,res,data,isLoggedOut){
    if(!isLoggedOut){
        res.redirect('/')
        return
    }

    if(!req.query.reCAPTCHAToken) return res.status(400).send('Bad Request')

    const captchaCheck = checkReCAPTCHA(req.query.reCAPTCHAToken,req)
    if(captchaCheck == null){
        res.status(400).send('Bad Request')
        return
    }
    if(captchaCheck < 0.5){ //reCAPTCHA score
        res.status(403).send('Forbidden')
        return
    }

    let state = generateState(16)

    let query = querystring.encode({
        client_id:data.client_id,
        response_type:'code',
        redirect_uri:data.redirect_uri,
        state:state,
        scope:data.scope,
        show_dialog:req.query.force?true:false
    })

    res.redirect('https://accounts.spotify.com/authorize?'+query)
}

module.exports = login