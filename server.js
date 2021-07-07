const express = require('express');
const app = express();
const cors = require('cors');
const cookie_parser = require('cookie-parser');
const data = require('./config');
const admin = require('firebase-admin');
const serviceAccount = require('./SECRET/accountkey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();
app.use(cookie_parser()).use(cors())
app.set('view engine','ejs')

app.get(/^\//,(req,res)=>{

    let isLoggedOut = !req.cookies['state'] || !req.cookies['uname']

    switch(req.path){
        case '/':
            if(isLoggedOut){
                res.render('indexOut.ejs',{isLoggedOut:isLoggedOut})
            }
            else{
                res.render('index.ejs',{isLoggedOut:isLoggedOut})
            }
        return
        case '/account':
            if(isLoggedOut){
                res.redirect('/')
                return
            }
            res.render('account.ejs',{isLoggedOut:isLoggedOut})
        return
        case '/top_tracks':
            if(isLoggedOut){
                res.redirect('/')
            }
            res.render('top_tracks.ejs',{isLoggedOut:isLoggedOut})
        return
        case '/login':
            require('./dynamic/login')(req,res,data,isLoggedOut)
        return
        case '/callback':
            require('./dynamic/callback')(req,res,db,data)
        return
        case '/gettoken':
            require('./dynamic/gettoken')(req,res,db,data)
        return
    }
    res.status(404).render('404.ejs',{url:req.url})
})

app.listen(process.env.PORT || 80,()=>{
    console.log('running!')
})