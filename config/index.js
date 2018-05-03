var path = require('path');

module.exports = {
	build: {
        env: {
            NODE_ENV: '"production"'
        },
        index: path.resolve(__dirname, '../dist/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'public',
        //此处配置项目路径，可带项目名
        //不带项目名，assetsPublicPath: '/'
        //带项目名，assetsPublicPath: '/bamzc/'
        assetsPublicPath: '/',
        productionSourceMap: true,
        productionGzip: false,
        productionGzipExtensions: ['js', 'css']
    },
    //输出到java项目里面
    jw: {
        env: {
            NODE_ENV: '"javaWeb"'
        },
        index: path.resolve(__dirname, '../../index.html'),
        assetsRoot: path.resolve(__dirname, '../../'),
        assetsSubDirectory: 'public',
        //此处配置项目路径，可带项目名
        //不带项目名，assetsPublicPath: '/'
        //带项目名，assetsPublicPath: '/bamzc/'
        assetsPublicPath: '/WebCaccFids/',
        productionSourceMap: true,
        productionGzip: false,
        productionGzipExtensions: ['js', 'css']
    },
    dev: {
    	env: {
            NODE_ENV: '"development"'
        },
        port: 8099,
        proxyTable: {
            '/WebCaccFids': {
                target: 'http://192.168.0.122:8088',
                changeOrigin: true,
                pathRewrite: {
                  '^/WebCaccFids': '/WebCaccFids'
                }
            }
        }
  	}
}