var gulp = require('gulp'),
  browserify = require('browserify'),
  source = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer'),
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
  shell = require('gulp-shell'),
  svgSprite = require("gulp-svg-sprites"),
  rework = require('gulp-rework'),
  reworkcalc = require('rework-calc'),
  reworkcustommedia = require('rework-custom-media'),
  reworkielimits = require('rework-ie-limits'),
  reworkNPM = require('rework-npm'),
  reworkcolor = require('rework-color-function'),
  suitconformance = require('rework-suit-conformance'),
  reworkvars = require('rework-vars'),
  prefix = require('gulp-autoprefixer');

var path = {
  src: './src/',
  build: './assets/',
  jekyll: './_site/'
}

path.js = {
  src: [
    './node_modules/jquery/dist/jquery.js',
    './node_modules/jquery-autosize/jquery.autosize.js',
    './node_modules/headroom.js/dist/headroom.js',
    './node_modules/headroom.js/dist/jQuery.headroom.js',
    path.src + '**/*.js'
  ]
};

  gulp.task('css', function () {
    return gulp.src(path.src + 'index.css')
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
      .pipe(gulp.dest(path.build))
      .pipe(csso())
      .pipe(rename('index.min.css'))
      .pipe(gulp.dest(path.build))
      .pipe(notify("CSS Compiled"));
  });

  gulp.task('js', function() {
    return gulp.src(path.js.src)
      .pipe(concat('index.js'))
      .pipe(gulp.dest(path.build))
      .pipe(uglify())
      .pipe(rename('index.min.js'))
      .pipe(gulp.dest(path.build))
      .pipe(notify("JS Compiled"));
  });

  gulp.task('sprites', function () {
    return gulp.src(path.src + '**/Icon-*.svg')
      .pipe(svgSprite({
        mode: "symbols",
        preview: false
      }))
      .pipe(rename('icons.svg'))
      .pipe(gulp.dest("_includes"));
  });

  gulp.task('images', function() {
    return gulp.src([path.src + 'images/*', path.src + '**/images/*'])
      .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeComments: true}]
      }))
      .pipe(rename(function (path) {
        path.dirname = "";
        console.log(path);
      }))
      .pipe(gulp.dest(path.build + 'images'));
  });

  gulp.task('buildLib', ['css', 'js', 'sprites', 'images']);

  // Create a function to stop repeating myself

  gulp.task('copycss', ['css'], function() {
    return gulp.src(path.build + '*.css')
      .pipe(gulp.dest(path.jekyll + path.build));
  });

  gulp.task('copyjs', ['js'], function() {
    return gulp.src(path.build + '*.js')
      .pipe(gulp.dest(path.jekyll + path.build));
  });

  gulp.task('copysprites', ['sprites'], function() {
    return gulp.src(path.build + '*.svg')
      .pipe(gulp.dest(path.jekyll + path.build));
  });

  gulp.task('copyimages', ['images'], function() {
    return gulp.src([path.src + 'images/*', path.src + '**/images/*'])
      .pipe(rename(function (path) {
          path.dirname = "";
      }))
      .pipe(gulp.dest(path.jekyll + path.build));
  });

  gulp.task('jekyll', ['buildLib'], shell.task([
    'jekyll build'
  ]))

  gulp.task('jekyllWatch', shell.task([
    'jekyll build'
  ]));

  gulp.task('build', ['buildLib', 'jekyll']);

  gulp.task('webserver', ['build'], function() {
    gulp.src(path.jekyll)
      .pipe(webserver({
        host: '0.0.0.0',
        livereload: true
      }));
  });

  gulp.task('serve',['build','webserver']);

  gulp.task('watch', ['serve'], function(){
    gulp.watch(path.src + '**/*.css', ['copycss']);
    gulp.watch(path.src + '**/*.js', ['copyjs']);
    gulp.watch(path.src + '**/*.svg', ['copysprites']);
    gulp.watch(path.src + 'images/*', ['copyimages']);
    gulp.watch([
      './_layouts/**/*',
      './_includes/**/*',
      './_posts/**/*',
      './*.xml',
      './*.html',
      './*.md'],
      ['jekyllWatch']);
  });

  gulp.task('default',['build']);

