var webpack = require('webpack');
var config = require('../config');
var merge = require('webpack-merge');
var baseWebpackConfig = require('./webpack.base.conf');
var HtmlWebpackPlugin = require('html-webpack-plugin');

//可以识别某些类别的Webpack错误,提供更好的开发者体验。
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

//在Webpack构建期间搜索CSS资源，并优化\最小化CSS
var OptimizecssPlugin = require('optimize-css-assets-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

// 添加热替换相关的代码到entry
Object.keys(baseWebpackConfig.entry).forEach(function(name) {
    baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})
module.exports = merge(baseWebpackConfig, {
    devtool: '#cheap-module-eval-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': config.dev.env
        }),
        
        new ExtractTextPlugin({
            filename: config.build.assetsSubDirectory+'/css/[name].[contenthash].css',
            allChunks: true
        }),
        //热替换
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        //new OptimizeCSSPlugin(),
        
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        }),
        new FriendlyErrorsPlugin()
    ]
})