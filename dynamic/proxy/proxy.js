const https = require('https')
const http = require('http')
const fs = require('fs')

function badRequest(res){
    res.status(400).end()
}

function proxy(req,res){
    let url = req.query.url
    if(!url) return badRequest(res)
    if(!url.startsWith('https://') && !url.startsWith('http://')) return badRequest(res)

    let protocol = url.startsWith('https://') ? https : http
    let domain = url.replace('http://','').replace('https://','').split('/')[0]
    let allowList = JSON.parse(fs.readFileSync('./dynamic/proxy/allow.json'))

    if(!allowList.includes(domain)) return badRequest(res)

    delete req.headers.cookie
    delete req.headers.host

    protocol.get(url,{
        headers:req.headers
    },function(fetchRes){
        res.status(fetchRes.statusCode)
        res.set(fetchRes.headers)

        fetchRes.on('data',data=>{
            res.write(data)
        })
        fetchRes.on('end',()=>{
            res.end()
        })
        fetchRes.on('error',(e)=>{
            console.log(e)
        })
    })
}
module.exports = proxy