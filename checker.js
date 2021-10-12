const fs = require('fs')
const main = function(){
    try{
        let read = fs.readFileSync('./db/data.json')
        read = JSON.parse(read)
    }
    catch(e){
        fs.writeFileSync('./db/data.json','{}')
    }
}
const version = function(){
    try{
        const read = fs.readFileSync('./db/scriptVer.txt')
        if(!read){
            const date = (+new Date()).toString()
            fs.writeFileSync('./db/scriptVer.txt',date)
            return date
        }
        return read
    }
    catch(e){
        const date = (+new Date()).toString()
        fs.writeFileSync('./db/scriptVer.txt',date)
        return date
    }
}
module.exports = {
    db:main,
    version:version
}