const fs = require('fs')
const uglify = require('uglify-js')
const listUglify = JSON.parse(fs.readFileSync('./minifier/list_uglify.json'))

for(let bundle in listUglify){
    let fileData = {}
    for(file of listUglify[bundle]){
        let fileName = file.split('/')
        fileName = fileName[fileName.length-1]

        fileData[fileName] = fs.readFileSync(file,{encoding:'utf-8'})
    }
    let res = (uglify.minify(fileData,{mangle:{eval:true,toplevel:true}})).code
    fs.writeFileSync('./public/script_minify/'+bundle+'.js',res)
}