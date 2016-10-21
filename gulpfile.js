'use strict'

var gulp = require('gulp'),
    webpack = require('webpack');

var config = require('./webpack.config');

/** 
 *  执行webpack打包
 */
gulp.task('webpack', function(cb) {
    webpack(config, cb)
});

gulp.task("watch",function(cb){
    gulp.watch('assets/js/**/*.js', ['webpack'])
})

gulp.task('default', ['webpack','watch'] ,function() {
    gulp.start()
})
