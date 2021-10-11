const path = require('path')
const TerserPlugin = require("terser-webpack-plugin")
module.exports = {
    mode:"production",
    entry: {
        "index":'./src/pages/index.js'
    },
    output: {
        filename:"[name].js",
        path: path.resolve(__dirname,"public")
    },
    optimization: {
        minimizer:[
            new TerserPlugin({
                terserOptions:{
                    /*mangle:{
                        properties:true,
                    }*/
                    mangle:{
                        properties:{
                            regex:/(^_)[^\s]+/
                        }
                    }
                }
            })
        ]
    },
    module:{
        rules:[
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ]
    }
}