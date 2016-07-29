var gulp = require('gulp');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var eslint = require('gulp-eslint');
var uglify = require('gulp-uglify');
var buildFiles = require('./build_list');

gulp.task('build-dev', function() {
  gulp.src(buildFiles)
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failOnError())
      .pipe(concat('nauper-dev.js'))
      .pipe(gulp.dest('build'));
});

gulp.task('build-release', function() {
  gulp.src(buildFiles)
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failOnError())
      .pipe(uglify())
      .pipe(concat('nauper.min.js'))
      .pipe(gulp.dest('build'))
      .pipe(gulp.dest('example/js'))
      
      .pipe(connect.reload());;
});

gulp.task('webserver', function() {
  connect.server({
    name: 'Nauper app',
    root: 'example',
    port: 8000,
    livereload: true
  });
});

gulp.task('build', ['build-dev', 'build-release']);

gulp.task('watch', function () {
  gulp.watch(['src/**/*.js'], ['build']);
});

gulp.task('default', ['webserver', 'watch', 'build']);