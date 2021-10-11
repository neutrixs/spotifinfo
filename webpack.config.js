const path = require('path')
const TerserPlugin = require("terser-webpack-plugin")
module.exports = {
    mode:"production",
    entry: {
        "jQuery":"./src/script/base/jquery.js",
        "he":"./src/script/base/he.js",
        "index":"./src/pages/index.js"
    },
    output: {
        filename:"[name].js",
        path: path.resolve(__dirname,"public")
    },
    optimization: {
        minimizer:[
            new TerserPlugin({
                terserOptions:{
                    mangle:{
                        properties:true,
                    }
                    /*mangle:{
                        properties:{
                            regex:/(^_)[^\s]+/
                        }
                    }*/
                }
            })
        ]
    }
}