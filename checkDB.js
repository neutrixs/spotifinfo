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
module.exports = main