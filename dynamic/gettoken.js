const { default: fetch } = require('node-fetch')
const querystring = require('querystring')
const fs = require('fs')
const checkReCAPTCHA = require('./checkReCAPTCHA')
const relogback = {
    success:false,
    data:null,
    relogback:true
}

async function gettoken(req,res,db,data){

    if(!req.query.reCAPTCHAToken) return res.status(400).send('Bad Request')

    const captchaCheck = await checkReCAPTCHA(req.query.reCAPTCHAToken,req)
    if(captchaCheck == null){
        res.status(400).send('Bad Request')
        return
    }
    if(captchaCheck < 0.5){ //reCAPTCHA score
        res.status(403).send('Forbidden')
        return
    }

    let database
    if(data.firestore){
        database = await db.collection('database').doc('stateNuname').get()
        if(database._fieldsProto !== undefined){
            database = database.data()
        }
        else{
            database = {}
        }
    }
    else{
        database = fs.readFileSync('./db/data.json',{encoding:'utf-8'})
        database = JSON.parse(database)
    }

    if(!req.cookies.state || !req.cookies.uname){
        res.json(relogback)
        return
    }
    if(!database[req.cookies.state]){
        res.json(relogback)
        return
    }
    if(database[req.cookies.state].id !== req.cookies.uname){
        res.json(relogback)
        return
    }

    let formBody = querystring.encode({
        grant_type:'refresh_token',
        refresh_token:database[req.cookies.state].refresh_token,
        client_id:data.client_id,
        client_secret:data.client_secret
    })

    let token = await fetch('https://accounts.spotify.com/api/token',{
        method:'POST',
        body:formBody,
        headers:{
            'Content-Type':'application/x-www-form-urlencoded'
        }
    })
    if(!token.ok){
        res.json(relogback)
        return
    }

    token = await token.json()

    res.json({
        success:true,
        data:{
            token:token.token_type+' '+token.access_token,
            validuntil:(new Date()-0)+token.expires_in
        }
    })
}

module.exports = gettoken