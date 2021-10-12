const path = require('path')
const TerserPlugin = require("terser-webpack-plugin")
let devMode = false

module.exports = function(env,argv){
    console.log(argv)
    devMode = argv.mode == "development"
    return config
}

const mangleNormal = {
    properties:{
        regex:/(^_)[^\s]+/
    }
}

const config = {
    mode: devMode ? "development" : "production",
    entry: {
        "index":'./src/pages/index.js',
        "indexOut":'./src/pages/indexOut.js'
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
                    mangle:devMode ? false : mangleNormal
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