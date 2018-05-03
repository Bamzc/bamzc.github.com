require('es6-promise/auto');
var config = require('../config');

if (!process.env.NODE_ENV) process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)

var path = require('path');

//Express 是一个基于 Node.js 平台的极简、灵活的 web 应用开发框架
var express = require('express');
var webpack = require('webpack');
var opn = require('opn');//启动浏览器，打开网页
var proxyMiddleware = require('http-proxy-middleware');//HTTP代理中间件
var webpackConfig = require('./webpack.dev.conf');

var port = process.env.PORT || config.dev.port;

//将HTTP代理定义到你的自定义API后端
var proxyTable = config.dev.proxyTable;

var airdes = express();
var compiler = webpack(webpackConfig);

/*
 * webpack开发中间件
 *  1.不会把处理过后的文件写入磁盘，而是写入内存
 *  2.监视文件更改，如果更改，则中间件不再服务旧的文件，
 *    但会延迟请求，直到编译完成。文件修改后，
 *    不必等到刷新页面，就会自动更改，配合webpack-hot-middleware进行热替换
 **/
var devMiddleware = require('webpack-dev-middleware')(compiler, {
  	publicPath: webpackConfig.output.publicPath,
  	stats: {
	    colors: true,
	    chunks: false
	}
});
/*
 * Webpack热中间件
 *   Webpack仅使用webpack-dev-middleware重新加载。
 *   这允许在没有webpack-dev-server的情况下将热重新加载到现有服务器中。
 **/
var hotMiddleware = require('webpack-hot-middleware')(compiler);

//html-webpack-plugin模板更改时强制页面重新加载
compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
        hotMiddleware.publish({ action: 'reload' })
        cb()
    })
})

//代理请求设置
Object.keys(proxyTable).forEach(function (context) {
    var options = proxyTable[context];
    if (typeof options === 'string') {
        options = { target: options, changeOrigin: true }
    }
    airdes.use(proxyMiddleware(context, options));
});
//处理HTML5历史记录API的回退
airdes.use(require('connect-history-api-fallback')());

//webpack包输出
airdes.use(devMiddleware);
  
//启用热重新加载和状态保存
airdes.use(hotMiddleware);

var staticPath = path.posix.join(config.build.assetsPublicPath, config.build.assetsSubDirectory);

airdes.use(staticPath, express.static('./public'));

module.exports = airdes.listen(port, function (err) {
    if (err) {
      console.log(err)
      return
    }
    var uri = 'http://localhost:' + port
    console.log('Listening at ' + uri + '\n')

    // when env is testing, don't need open it
    if (process.env.NODE_ENV !== 'testing') {
        opn(uri)
    }
})