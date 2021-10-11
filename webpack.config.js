const path = require('path')
const TerserPlugin = require("terser-webpack-plugin")
let devMode = false

module.exports = function(env,argv){
    devMode = argv.mode == "development"
    return config
}

const config = {
    mode: devMode ? "development" : "production",
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