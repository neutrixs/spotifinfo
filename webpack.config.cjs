// @ts-check

const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WebpackObfuscator = require('webpack-obfuscator')
const { ESBuildMinifyPlugin } = require('esbuild-loader')
let devMode = false

module.exports = function (env, argv) {
    console.log(argv)
    devMode = argv.mode == 'development'

    const nameOrContentHash = devMode ? '[name]' : '[contenthash]'

    return config(nameOrContentHash)
}

/**
 * @type { (nameOrContentHash: string) => import('webpack').Configuration }
 */

const config = nameOrContentHash => ({
    mode: devMode ? 'development' : 'production',
    entry: './src/main.tsx',
    output: {
        filename: `assets/${nameOrContentHash}.js`,
        path: path.resolve(__dirname, 'public'),
        clean: true,
    },
    target: ['web', 'es6'],
    optimization: {
        minimizer: [
            new ESBuildMinifyPlugin({
                target: 'es6',
                css: true,
            }),
        ],
        runtimeChunk: 'single',
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.tsx$/,
                loader: 'esbuild-loader',
                options: {
                    loader: 'tsx',
                    target: 'es6',
                },
            },
            {
                test: /\.ts$/,
                loader: 'esbuild-loader',
                options: {
                    loader: 'ts',
                    target: 'es6',
                },
            },
            {
                test: /\.(png|jpe?g|gif|jp2|webp|otf)$/,
                loader: 'file-loader',
                options: {
                    name: `assets/${nameOrContentHash}.[ext]`,
                    esModule: false,
                },
            },
            {
                test: /\.svg$/,
                type: 'asset/inline',
            },
            {
                test: /\.md$/,
                type: 'asset/source',
            },
            !devMode
                ? {
                      test: /__obfu\.[tj]sx?$/,
                      enforce: 'post',
                      use: {
                          loader: WebpackObfuscator.loader,
                          options: {
                              deadCodeInjection: true,
                              deadCodeInjectionThreshold: 1,
                              controlFlowFlattening: true,
                              controlFlowFlatteningThreshold: 0.2,
                              domainLock: ['192.168.1.50', 'spotifinfo.neutrix-web.xyz'],
                              domainLockRedirectUrl: 'https://youtu.be/dQw4w9WgXcQ?autoplay=true', //because why not :D
                          },
                      },
                  }
                : {},
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: './src/favicon.ico',
                    to: './favicon.ico',
                },
                {
                    from: './src/img/nojs.webp',
                    to: './assets/nojs.webp',
                },
            ],
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: devMode ? 'index.html' : 'meaningOfLife.html',
            publicPath: '/',
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true,
                minifyCSS: true,
                minifyJS: true,
            },
        }),
        new MiniCssExtractPlugin({
            filename: `assets/${nameOrContentHash}.css`,
        }),
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    devServer: {
        host: '192.168.1.50',
        port: process.env.WEBPACK_DEV_SERVER_PORT || 81,
        static: './public',
        hot: true,
        historyApiFallback: true,
        allowedHosts: ['192.168.1.50', 'localhost'],
        proxy: {
            '/api/*': 'http://192.168.1.50:' + process.env.PORT || '80',
        },
    },
    devtool: devMode ? 'source-map' : false,
    performance: {
        maxAssetSize: 512000,
    },
})
