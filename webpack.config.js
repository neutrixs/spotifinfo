const path = require('path')
const TerserPlugin = require("terser-webpack-plugin")
const CopyPlugin = require("copy-webpack-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
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
        "index":'./src/script/index.tsx'
    },
    output: {
        filename:"[fullhash].js",
        path: path.resolve(__dirname,"public"),
        clean:true
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
            }),
            new CssMinimizerPlugin()
        ]
    },
    module:{
        rules:[
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ],
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    },
    plugins:[
        new CopyPlugin({
            patterns:[
                {
                    from:'./src/font',
                    to:'./font'
                },
                {
                    from:'./src/img',
                    to:'./img'
                },
                {
                    from:'./src/favicon.ico',
                    to:'./favicon.ico'
                }
            ]
        }),
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            filename:'index.html',
            publicPath:'/'
        }),
        new MiniCssExtractPlugin({
            filename:'[contenthash].css'
        })
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    devServer: {
        host:'192.168.1.50',
        static: './public',
        hot:false,
        historyApiFallback:true,
        allowedHosts: ['192.168.1.50','localhost']
    }
}