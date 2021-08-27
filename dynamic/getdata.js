const fs = require('fs')
const main = function(req,res,config){
    if(req.headers.authorization != config.pass){
        res.status(403).send()
        return
    }

    let data = fs.readFileSync('./db/data.json',{encoding:'utf-8'})
    data = JSON.parse(data)

    res.json(data)
}
module.exports = main