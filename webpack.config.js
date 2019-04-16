/**
 * Note: I borrowed this from a demo-project, my understanding of this file is limited -Jan
 */

const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
require('babel-register');

const OUTPUT_PATH = __dirname + "/dist";

const HTML_PATH = "./src/html";
const JS_PATH = "./src/js";
const CSS_PATH = "./style";

module.exports = {
    entry: JS_PATH + '/main.js',
    cache: false,
    mode: 'development',
    output: {
        path: path.resolve(OUTPUT_PATH),
        filename: 'esgf-search.js',
        hotUpdateChunkFilename: 'hot/hot-update.js',
        hotUpdateMainFilename: 'hot/hot-update.json'
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    query:
                        {
                            presets: [
                                '@babel/preset-env',
                                '@babel/preset-react'
                            ]
                        }
                }
            }, //JavaScript
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {minimize: true}
                    }
                ]
            }, //HTML
            {
                test: /\.(s*)css$/,
                use: [
                    MiniCssExtractPlugin.loader, 
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: function(){
                                return [ require("precss"), require("autoprefixer")]
                            }
                        }
                    },
                    "sass-loader",
                ]
            }, //CSS
            {
                test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$|\.woff$|\.woff2$|\.eot$|\.ttf$|\.wav$|\.mp3$/,
                loader: 'file-loader?name=[name].[ext]' // <-- retain original file name
            } //Static files
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    externals: {},
    plugins: [
        //TODO figure this out
        new HtmlWebPackPlugin({
            template: HTML_PATH + '/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: CSS_PATH + '/[name].css',
            chunkFilename: '[id].css'
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        overlay: false,
        hot: true
    },
    watchOptions: {
        ignored: /node_modules/
    }
};
module.loaders = [
    {test: /\.js$/, exclude: /node_modules/, use: 'babel-loader'}
];
