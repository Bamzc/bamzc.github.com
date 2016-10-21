'use strict'

var gulp = require('gulp'),
    webpack = require('webpack'),
    uglify = require('gulp-uglify');

var config = require('./webpack.config');

/** 
 *  执行webpack打包
 */
gulp.task('webpack', function(cb) {
    webpack(config, cb)
});
/** 
 *  压缩js
 */
gulp.task('script',function(){
    gulp.src('./assets/themes/dist/*.js')
    // .pipe(rename({suffix:'.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('assets/js'));
});

gulp.task("watch",function(cb){
    gulp.watch('assets/themes/js/**/*.js', ['webpack','script']);
})

gulp.task('default', ['webpack','script','watch'] ,function() {
    gulp.start()
})
