var gulp = require('gulp'),
  csso = require('gulp-csso'),
  jshint = require('gulp-jshint'),
  uglify = require('gulp-uglify'),
  imagemin = require('gulp-imagemin'),
  rename = require('gulp-rename'),
  rimraf = require('gulp-rimraf'),
  concat = require('gulp-concat'),
  notify = require('gulp-notify'),
  cache = require('gulp-cache'),
  webserver = require('gulp-webserver'),
  rework = require('gulp-rework'),
  reworkcalc = require('rework-calc'),
  reworkcustommedia = require('rework-custom-media'),
  reworkielimits = require('rework-ie-limits'),
  reworkNPM = require('rework-npm'),
  reworkcolor = require('rework-color-function'),
  suitconformance = require('rework-suit-conformance'),
  reworkvars = require('rework-vars'),
  prefix = require('gulp-autoprefixer');

  gulp.task('css', function () {
    gulp.src('./lib/index.css')
      .pipe(rework(
        reworkNPM(),
        reworkvars(),
        reworkcalc,
        reworkcolor,
        reworkcustommedia,
        reworkielimits,
        suitconformance
      ))
      .pipe(prefix(
        [
          'Explorer >= 9',
          'last 2 Chrome versions',
          'last 2 Firefox versions',
          'last 2 Safari versions',
          'last 2 iOS versions',
          'Android 4'
        ],
        { cascade: true }
      ))
      .pipe(gulp.dest('build'))
      .pipe(csso())
      .pipe(rename('index.min.css'))
      .pipe(gulp.dest('build'))
      .pipe(notify("CSS Compiled"));
  });

  gulp.task('templates', function () {
    gulp.src('./lib/**/*.html')
      .pipe(gulp.dest('build'));
  });

  gulp.task('build',['css', 'templates']);

  gulp.task('webserver', function() {
    gulp.src('build')
      .pipe(webserver({
        livereload: true,
        fallback: 'index.html'
      }));
  });

  gulp.task('serve',['build','webserver']);

  gulp.task('watch', ['serve'], function(){
    // gulp.watch(['./lib/**/*.js');
    gulp.watch('./lib/**/*.css',['css']);
    gulp.watch('./lib/**/*.html',['templates']);
  });

  gulp.task('default',['build']);

