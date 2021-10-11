const path = require('path')
module.exports = {
    entry: {
        "jQuery":"./src/script/base/jquery.js",
    },
    output: {
        filename:"[name].js",
        path: path.resolve(__dirname,"public")
    }
}