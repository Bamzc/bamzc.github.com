'use strict'

var path = require('path');
var webpack = require('webpack');
var glob = require("glob");
//分离CSS和JS文件
var ExtractTextPlugin = require('extract-text-webpack-plugin');

function isProduction() {
    return process.env.NODE_ENV === 'production';
}
//webpack插件
var plugins = [
    //提公用js到common.js文件中
    new webpack.optimize.CommonsChunkPlugin('common.js'),
    //使用 ProvidePlugin 加载使用率高的依赖库
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })
];

var entry = glob.sync("./assets/js/**/*.js"),
    cdnPrefix = '',
    buildPath = '/assets/dist/',
    publishPath = cdnPrefix + buildPath;
function arrToObj(arr){
    var obj = {};
    arr.forEach(function(v,i){
        let k = path.basename(v,'.js');
        obj[k] = v;
    });

    return obj;
}
let entryObj = arrToObj(entry);
//生产环境js压缩和图片cdn
if (isProduction()) {
    //plugins.push(new webpack.optimize.UglifyJsPlugin());
    cdnPrefix = "";
    publishPath = cdnPrefix;
}

module.exports = {
    debug : true,
    entry : entryObj,
    output : {
        path : __dirname + publishPath,
        filename : '[name].build.js',//打包后的文件名
        publicPath : publishPath, //网站运行时的访问路径。
        chunkFilename:"[id].build.js?[chunkhash]"
    },
    module : {
        loaders : [{
            test : /\.css/,
            loader :  ExtractTextPlugin.extract(
                "style-loader", "css-loader?sourceMap!cssnext-loader")
        },{
            test : /\.js/,
            exclude: /node_modules|vue\/dist/,
            loader: 'babel'
        },{
            test : /\.(jpg|png|gif)$/,
            loader : "file-loader?name=images/[hash].[ext]"
        },{
            test : /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader : "url-loader?limit=10000&minetype=application/font-woff"
        },{
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "file-loader"
        },{
            test: /\.json$/,
            loader: 'json'
        },{
            test: /\.(html|tpl)$/,
            loader: 'html-loader'
        }]
    },
    babel: {
        presets: ['es2015', 'stage-0'],
        plugins: ['transform-runtime']
    },
    resolve: {
        // require时省略的扩展名，如：require('module') 不需要module.js
        extension: ['', '.js'],
        //别名
        alias: {
            filter: path.join(__dirname, 'src/filters'),
            jquery: path.join(__dirname, 'assets/base/jquery-2.1.4')
        }
    },
    plugins: plugins,
    devtool: '#source-map'
}