const fs = require('fs')
const minify = require('babel-minify')
const dir = ['./public/script','./public/script/top','./public/script/acc']

for(const currentDir of dir){
    let listFile = fs.readdirSync(currentDir).filter(f=>f.endsWith('.js')).filter(f=>f!=='jquery.js' && f!=='he.js' && !f.includes('minify'))
    for(let file of listFile){
        let content = fs.readFileSync(currentDir+'/'+file,{encoding:'utf-8'})
        let res = minify(content)

        fs.writeFileSync(currentDir.replace('/script','/script_minify')+'/'+file,res.code)
    }
}