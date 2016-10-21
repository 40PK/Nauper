var gulp = require('gulp');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var eslint = require('gulp-eslint');
var uglify = require('gulp-uglify');
var buildFiles = require('./build_list');

gulp.task('help', function help() {
  console.log('build-dev - builds code');
  console.log('build-release - builds code and minifies it');
  console.log('build - runs build-dev and build-release');
  console.log('watch - spies on files and builds it on change');
  console.log('webserver - running web server on localhost:8000 with code from example folder');
  console.log('default - runs webserver, watch and build');
});

gulp.task('build-dev', function buildDev() {
  return gulp.src(buildFiles)
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failOnError())
      .pipe(babel({presets: ['es2015']}))
      .pipe(concat('nauper.js'))
      .pipe(gulp.dest('example/js'))
      .pipe(gulp.dest('build'));
});

gulp.task('build-release', function buildRelease() {
  return gulp.src(buildFiles)
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failOnError())
      .pipe(babel({presets: ['es2015']}))
      .pipe(uglify())
      .pipe(concat('nauper.min.js'))
      .pipe(gulp.dest('build'))
      .pipe(gulp.dest('example/js'))
      .pipe(connect.reload());
});

gulp.task('webserver', function webserver() {
  connect.server({
    name: 'Nauper app',
    root: 'example',
    port: 8000,
    livereload: true
  });
});

gulp.task('build', ['build-dev', 'build-release']);

gulp.task('watch', function watch() {
  gulp.watch(['src/**/*.js'], ['build']);
});

gulp.task('noreload', ['webserver', 'build']);

gulp.task('default', ['webserver', 'watch', 'build']);
