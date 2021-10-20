const express = require('express');
const app = express();
const cookie_parser = require('cookie-parser');
const data = require(process.argv.includes('--devmode') ? './config_for_self' : './config' );
const admin = require('firebase-admin');
const serviceAccount = require('./SECRET/accountkey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

require('./checker')()

if(process.argv.includes('--devmode')) {
    app.use(express.static(__dirname+'/public'))
}

app.use(cookie_parser())
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname+'/public')

app.get(/^\//,(req,res)=>{

    let isLoggedOut = !req.cookies['state'] || !req.cookies['uname']

    const defaultRender = function(){
        res.render('index.html')
    }

    switch(req.path){
        case '/':
            defaultRender()
        return
        case '/account':
            defaultRender()
        return
        case '/top_tracks':
            defaultRender()
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
        case '/proxy':
            require('./dynamic/proxy/proxy')(req,res)
        return
    }
    res.status(404).render('index.html')
})
app.post('/getdata',(req,res)=>{
    require('./dynamic/getdata')(req,res,data)
})

app.listen(process.env.PORT || 80,()=>{
    console.log('running!')
})

process.on('uncaughtException',(e)=>{
    console.log(e)
})