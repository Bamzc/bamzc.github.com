'use strict'

var path = require('path');
var webpack = require('webpack');
var glob = require('glob');
//分离CSS和JS文件
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = require('../config');

var utils = require('./utils');
var entry = glob.sync("./src/js/**/*.js"),
    cdnPrefix = '',
    buildPath = '/dist/',
    publishPath = cdnPrefix + buildPath;
function arrToObj(arr){
    var obj = {};
    arr.forEach(function(v,i){
        var k = path.basename(v,'.js');
        obj[k] = v;
    });

    return obj;
}
var entryObj = arrToObj(entry);
module.exports = {
    entry : entryObj,
    output : {
        path : config.build.assetsRoot, //输出目录
        filename : '[name].js',//打包后的文件名
        publicPath : config.build.assetsPublicPath
    },
    resolve: {
        extensions: ['.css', '.js', '.vue'],
        // fallback: [path.join(__dirname, '../node_modules')],
        alias: {
            'src': path.resolve(__dirname, '../src'),
            'assets': path.resolve(__dirname, '../src/assets')
        }
    },
    module : {
        rules : [
        /*{
            test: /\.(js|vue)$/,
            loader: 'eslint-loader',
            enforce: "pre",
            exclude: [/node_modules/],
            options: {
                formatter: require('eslint-friendly-formatter')
            }
        },*/
        {
            test : /\.vue$/,
            loader : 'vue-loader',
            options: {
                loaders: {
                    css: ExtractTextPlugin.extract({
                        use: 'css-loader',
                        fallback: 'vue-style-loader'
                    })
                }
            }

        },{
            test : /\.css/,
            exclude: [/node_modules\/(?!(ng2-.+|ngx-.+))/],
            use: ExtractTextPlugin.extract({
                use: ['css-loader'],
                fallback: 'style-loader'
            })
        },{
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            query: {
                limit: 10000,
                name: utils.assetsPath('img/[name].[ext]')
            }
        },{
            test: /\.(woff2?|eot|ttf|svg|otf)(\?.*)?$/,
            loader: 'url-loader',
            query: {
                limit: 10000,
                name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
            }
        },{
            test : /\.js/,
            exclude: [/node_modules|vue\/dist/],
            use: 'babel-loader'
        },{
            test: require.resolve('jquery'),
            use: [{
              loader: 'expose-loader',
              options: 'jQuery'
            },{
              loader: 'expose-loader',
              options: '$'
            }]
        }]
    },
    devtool: '#source-map'
}