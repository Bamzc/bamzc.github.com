'use strict'

var path = require('path');

var webpack = require('webpack');
//获取wepack base 配置
var baseWebpackConfig = require('./webpack.base.conf');

var merge = require('webpack-merge')
//分离CSS和JS文件
var ExtractTextPlugin = require('extract-text-webpack-plugin');

/*var HtmlWebpackPlugin = require('html-webpack-plugin');*/
var AssetsPlugin = require('assets-webpack-plugin');
var assetsPluginInstance = new AssetsPlugin({
    filename: 'dist/a.js',
    processOutput: function (assets) {
        return 'window.staticMap = ' + JSON.stringify(assets)
    }
});

var config = require('../config');

var env = config.build.env;


var webpackConfig = merge(baseWebpackConfig,{
    output: {
        path: config.build.assetsRoot,
        filename: config.build.assetsSubDirectory+'/js/[name].[chunkhash].js',
        chunkFilename: config.build.assetsSubDirectory+'/js/[id].[chunkhash].js'
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        assetsPluginInstance,
        new webpack.DefinePlugin({
            'process.env': env
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
              warnings: false
            }
        }),
        //生成一个index.html页面
        /*new HtmlWebpackPlugin({
            filename: config.build.index,
            template: 'index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            chunksSortMode: 'dependency'
        }),*/
        //提取css
        new ExtractTextPlugin({
            filename: config.build.assetsSubDirectory+'/css/[name].[contenthash].css',
            allChunks: true,
            disable: false
        }),
        // 代码拆分,将公共的代码,提取到vendor.js
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function(module, count) {
                // any required modules inside node_modules are extracted to vendor
                return (
                    module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(
                        path.join(__dirname, '../node_modules')
                    ) === 0
                )
            }
        }),
        // 运行时代码提取到一个单独的 manifest 文件中
        // prevent vendor hash from being updated whenever app bundle is updated
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            chunks: ['vendor']
        })
    ]
})

module.exports = webpackConfig;