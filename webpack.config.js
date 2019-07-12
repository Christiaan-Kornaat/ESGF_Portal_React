/**
 * Note: I borrowed this from a demo-project, my understanding of this file is limited -Jan
 * Thank you Jan, very cool -Mart
 */

const path = require("path");
require("babel-register");
const autoprefixer = require('autoprefixer');
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: path.resolve(__dirname, 'src/js/index.js'),
    mode: "production",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "index.js",
        hotUpdateChunkFilename: "hot/hot-update.js",
        hotUpdateMainFilename: "hot/hot-update.json",
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            { //TypeScript
                test: /\.(ts|tsx)$/,
                exclude: /(node_modules|bower_components|dist)/,
                include: path.resolve(__dirname, "src", "js"),
                use: ['awesome-typescript-loader']
            },
            { // JavaScript
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|dist)/,
                use: ['babel-loader']
            },
            { // Static files
                test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
                loader: 'file-loader?name=[name].[ext]' // <-- retain original file name
            },
            { // Fonts
                test: /\.(ttf|eot|woff|woff2)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'fonts/[name].[ext]'
                    }
                }
            },
            { // SCSS
                test: /\.scss$/,
                use: [
                    'style-loader', // creates style nodes from JS strings
                    MiniCssExtractPlugin.loader,
                    'css-loader', // translates CSS into CommonJS
                    'postcss-loader',
                    'sass-loader' // compiles Sass to CSS
                ]
              }
        ]
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", "scss"]
    },
    plugins: [
       new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: "[id].css"
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    externals: {
        'react': 'commonjs react' // this line is just to use the React dependency of our parent-testing-project instead of using our own React.
    },
    devServer: {
        overlay: false,
        hot: true
    },
    watchOptions: {
        ignored: /node_modules/
    }
};