const fetch = require('node-fetch')
const fs = require('fs')
const querystring = require('querystring')
async function checkReCAPTCHA(token,req){
    const options = {
        secret: fs.readFileSync('SECRET/reCAPTCHASecret.txt',{encoding:'utf-8'}),
        response:token,
        remoteip:req.ip
    }
    const encodedQuery = querystring.encode(options)
    
    let validation = await fetch('https://www.google.com/recaptcha/api/siteverify',{
        method: 'POST',
        body:encodedQuery,
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    validation = await validation.json()

    if(!validation.success){
        return null
    }
    return validation.score
}
module.exports = checkReCAPTCHA