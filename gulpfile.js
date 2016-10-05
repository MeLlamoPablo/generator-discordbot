'use strict';
var path = require('path');
var gulp = require('gulp');
var nsp = require('gulp-nsp');
var plumber = require('gulp-plumber');

gulp.task('nsp', function (cb) {
  nsp({package: path.resolve('package.json')}, cb);
});

gulp.task('watch', function () {
  gulp.watch(['generators/**/*.js', 'test/**'], ['test']);
});

gulp.task('prepublish', ['nsp']);
