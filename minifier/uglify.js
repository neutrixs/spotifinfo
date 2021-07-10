const fs = require('fs')
const uglify = require('uglify-js')
const dir = ['./public/script','./public/script/top','./public/script/acc']
const mangleTopLevel = ['./public/script/colour.js','./public/script/nowPlaying.js']
let shouldMangleTop,mangleOption;

for(const currentDir of dir){
    let listFile = fs.readdirSync(currentDir).filter(f=>f.endsWith('.js')).filter(f=>f!=='jquery.js' && f!=='he.js' && !f.includes('minify'))
    for(let file of listFile){
        let content = fs.readFileSync(currentDir+'/'+file,{encoding:'utf-8'})
        if(mangleTopLevel.includes(currentDir+'/'+file)){
            shouldMangleTop = true
        }
        else{
            shouldMangleTop = false
        }

        mangleOption = shouldMangleTop?{toplevel:true}:true

        let res = uglify.minify(content,{mangle:mangleOption})

        fs.writeFileSync(currentDir.replace('/script','/script_minify')+'/'+file,res.code)
    }
}