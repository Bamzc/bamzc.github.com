// https://github.com/shelljs/shelljs
require('shelljs/global')
require('es6-promise/auto');
var path = require('path');

var webpack = require('webpack');

var webpackConfig = require('./webpack.prod.conf');

var config = require('../config');

//执行过程，添加一个loading
var ora = require('ora');

env.NODE_ENV = config.build.env.NODE_ENV;

//loading....
var spinner = ora('building for '+env.NODE_ENV+'...');

spinner.start();

var assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory);

rm('-rf', assetsPath);
mkdir('-p', assetsPath);
cp('-R', 'public/*', assetsPath);

webpack(webpackConfig, function (err, stats) {
  	spinner.stop()
  	if (err) throw err
  	process.stdout.write(stats.toString({
	    colors: true,
	    modules: false,
	    children: false,
	    chunks: false,
	    chunkModules: false
  	}) + '\n')
});