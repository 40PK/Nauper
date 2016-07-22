var gulp = require('gulp');
var concat = require('gulp-concat');
var eslint = require('gulp-eslint');
var uglify = require('gulp-uglify');
var buildFiles = require('./build_list');

gulp.task('build-dev', function() {
  gulp.src(buildFiles)
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failOnError())
      .pipe(concat('nauper-dev.js'))
      .pipe(gulp.dest('dist'));
});

gulp.task('build-release', function() {
  gulp.src(buildFiles)
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failOnError())
      .pipe(uglify())
      .pipe(concat('nauper-dev.js'))
      .pipe(gulp.dest('dist'));
});

gulp.task('build', ['build-dev', 'build-release']);