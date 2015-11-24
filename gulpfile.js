var gulp = require('gulp');
var useref = require('gulp-useref');
var plumber = require('gulp-plumber');
var atImport = require("postcss-import");

var postcss = require('gulp-postcss');
var processors = [
  require('postcss-mixins'),
  atImport(),
  require('postcss-hexrgba'),
  require('postcss-simple-vars'),
  require('postcss-nested'),
  require('cssnano'),
  require('autoprefixer-core')({ browsers: ['last 2 versions', '> 2%'] })
];

/**
 * BrowserSync
 * and reload
 */
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

gulp.task('html', function () {
  return gulp.src('app/*.html')
    .pipe(plumber())
    .pipe(useref())
    .pipe(gulp.dest('client'))
    .pipe(reload({
      stream: true
    }));
});

/**
*  Handlebars
*  views
*/
gulp.task('hbs', function () {
  return gulp.src('app/views/*.hbs')
    .pipe(plumber())
    .pipe(gulp.dest('client/views'))
    .pipe(reload({
      stream: true
    }));
});

gulp.task('scss', function () {
  gulp.src('app/assets/scss/app.css')
    .pipe(plumber())
    .pipe(postcss(processors))
    .pipe(gulp.dest('client/css'))
    .pipe(browserSync.stream());
});

gulp.task('jsAssets', function () {

  gulp.src('app/assets/js/**/*')
    .pipe(plumber())
    .pipe(gulp.dest('client/js'));

  gulp.src('app/assets/visageSDK.data')
    .pipe(plumber())
    .pipe(gulp.dest('client'));

});

gulp.task('storage', function () {
  gulp.src('storage/**/*')
    .pipe(plumber())
    .pipe(gulp.dest('client'));
});

/**
*  Watch
*  for reload
*/
gulp.task('watch', ['html', 'hbs', 'scss', 'jsAssets', 'storage'], function ()  {

  browserSync.init({
    server: {
      baseDir: 'client'
    }
  });

  gulp.watch("app/index.html", ['html']);
  gulp.watch("app/bootstrap.js", ['html']);
  gulp.watch("app/app.js", ['html']);
  gulp.watch("app/core/**/*.js", ['html']);
  gulp.watch("app/controller/**/*.js", ['html']);
  gulp.watch("app/views/**/*.hbs", ['hbs']);
  gulp.watch("app/assets/scss/**/*.css", ['scss']);

});