"use strict";

var eslint = require('gulp-eslint');
var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');

var paths = {
  scripts: ['**/*.js', '!www/client.min.js', '!node_modules/**/*.js', '!typings/*.ts'],
};

gulp.task('eslint', function() {
  return gulp.src(paths.scripts)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

///////////
// Tasks //
///////////

gulp.task('styles', function() {
  gulp.task('sass', function() {
    return gulp.src('./www/css/main.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./www/css/main.css'));
  });
});

// Builds the application
gulp.task('build', ['eslint']);

gulp.task('default', ['build']);