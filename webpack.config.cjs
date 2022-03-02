const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WebpackObfuscator = require('webpack-obfuscator')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const { ESBuildMinifyPlugin } = require('esbuild-loader')
let devMode = false

module.exports = function (env, argv) {
    console.log(argv)
    devMode = argv.mode == 'development'

    const nameOrContentHash = devMode ? '[name]' : '[name].[contenthash]'
    const nameOrContentHashFiles = devMode ? '[name]' : '[contenthash]'

    return config(nameOrContentHash, nameOrContentHashFiles)
}

const config = (nameOrContentHash, nameOrContentHashFiles) => ({
    mode: devMode ? 'development' : 'production',
    entry: {
        main: {
            import: './src/pages/index.tsx',
            dependOn: ['module~0', 'module~1', 'module~2'],
        },
        'module~0': ['react', 'react-dom', 'react-router-dom'],
        'module~1': 'react-markdown',
        'module~2': '@neutrixs/colorthief',
    },
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
                test: /\.(png|jpe?g|gif|jp2|webp|svg|otf|md)$/,
                loader: 'file-loader',
                options: {
                    name: `assets/${nameOrContentHashFiles}.[ext]`,
                    esModule: false,
                },
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
            ],
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: devMode ? 'index.html' : 'meaningOfLife.html',
            publicPath: '/',
        }),
        new MiniCssExtractPlugin({
            filename: `assets/${nameOrContentHash}.css`,
        }),
        new ProgressBarPlugin({
            format: '[:bar] :msg, :percent',
        }),
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    devServer: {
        host: '192.168.1.50',
        static: './public',
        hot: true,
        historyApiFallback: true,
        allowedHosts: ['192.168.1.50', 'localhost'],
        proxy: {
            '/gettoken': 'http://192.168.1.50',
            '/login': 'http://192.168.1.50',
        },
    },
    performance: {
        maxAssetSize: 512000,
    },
})
