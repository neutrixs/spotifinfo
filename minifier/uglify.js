const fs = require('fs')
const uglify = require('uglify-js')
const dir = ['./public/script','./public/script/top','./public/script/acc']
const mangleEval = ['./public/script/nowPlaying.js','./public/script/recentlyPlayed.js','./public/script/top/getTop.js']
let shouldMangleEval,mangleOption;

for(const currentDir of dir){
    let listFile = fs.readdirSync(currentDir).filter(f=>f.endsWith('.js')).filter(f=>f!=='jquery.js' && f!=='he.js' && !f.includes('minify'))
    for(let file of listFile){
        let content = fs.readFileSync(currentDir+'/'+file,{encoding:'utf-8'})
        if(mangleEval.includes(currentDir+'/'+file)){
            shouldMangleEval = true
        }
        else{
            shouldMangleEval = false
        }

        mangleOption = shouldMangleEval?{eval:true}:true

        let res = uglify.minify(content,{mangle:mangleOption})

        fs.writeFileSync(currentDir.replace('/script','/script_minify')+'/'+file,res.code)
    }
}