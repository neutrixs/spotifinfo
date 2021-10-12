const fs = require('fs')

const date = (+new Date()).toString()

fs.writeFileSync('./db/scriptVer.txt',date)