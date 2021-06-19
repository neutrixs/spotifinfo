const fetch = require('node-fetch')
const querystring = require('querystring')
async function callback(req,res,db,data){
    if(req.query.error){
        res.redirect('/')
        return
    }
    if(!req.query.code || !req.query.state){
        res.redirect('/')
    }

    let option = querystring.encode({
        grant_type:'authorization_code',
        code:req.query.code,
        redirect_uri:data.redirect_uri,
        client_id:data.client_id,
        client_secret:data.client_secret
    })

    let token = await fetch('https://accounts.spotify.com/api/token',{
        method:'POST',
        body:option,
        headers:{
            'content-type':'application/x-www-form-urlencoded'
        }
    })
    token = await token.json()

    let access_token = token.access_token
    let refresh_token = token.refresh_token

    let uname = await fetch('https://api.spotify.com/v1/me',{
        headers:{
            'Authorization':`Bearer ${access_token}`
        }
    })
    uname = await uname.json()
    uname = uname.id

    let database = await db.collection('database').doc('stateNuname').get()
    if(database._fieldsProto == undefined){
        database = {}
    }
    else{
        database = database.data()
    }
    database[req.query.state] = {
        id:uname,
        refresh_token:refresh_token,
        dateadded:new Date()-0
    }
    await db.collection('database').doc('stateNuname').set(database)

    res.cookie('uname',uname).cookie('state',req.query.state).redirect('/')
}

module.exports = callback