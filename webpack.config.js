const path = require('path')
module.exports = {
    mode:"production",
    entry: {
        "jQuery":"./src/script/base/jquery.js",
    },
    output: {
        filename:"[name].js",
        path: path.resolve(__dirname,"public")
    }
}