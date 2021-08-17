const fs = require('fs')
const uglify = require('uglify-js')
const listUglify = JSON.parse(fs.readFileSync('./minifier/list_uglify.json'))
const listUglifyStyle = JSON.parse(fs.readFileSync('./minifier/list_uglify_style.json'))
const clean = require('clean-css')

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

for(let bundle in listUglifyStyle){
    let fileData = {}
    for(file of listUglifyStyle[bundle]){
        let fileName = file.split('/')
        fileName = fileName[fileName.length-1]

        fileData[fileName] = {
            styles:fs.readFileSync(file,{encoding:'utf-8'})
        }
    }
    let res = new clean().minify(fileData)
    fs.writeFileSync('./public/style_minify/'+bundle+'.css',res.styles)
}