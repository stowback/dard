var gulp = require('gulp');
var useref = require('gulp-useref');

/**
 * BrowserSync
 * and reload
 */
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

gulp.task('html', function () {
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulp.dest('client'))
    .pipe(reload({
      stream: true
    }));
});

gulp.task('hbs', function () {
  return gulp.src('app/views/*.hbs')
    .pipe(gulp.dest('client/views'))
    .pipe(reload({
      stream: true
    }));
});

gulp.task('watch', function ()  {

  browserSync.init({
    server: {
      baseDir: 'client'
    }
  });

  gulp.watch("app/index.html", ['html']);
  gulp.watch("app/bootstrap.js", ['html']);
  gulp.watch("app/core/**/*.js", ['html']);
  gulp.watch("app/views/**/*.hbs", ['hbs']);

});