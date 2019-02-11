const path = require('path');
const gulp = require('gulp');
const eslint = require('gulp-eslint');
const debug = require('gulp-debug');
const notify = require('gulp-notify');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const autoprefixer = require('autoprefixer');
const ansiColors = require('ansi-colors');

const webpack = require('webpack');
const webpackDevConfig = require('../webpack/webpack.dev');
const webpackProdConfig = require('../webpack/webpack.prod');

const distPath = path.resolve('../../browsers/dist');

const webpackTask = function(config, done) {
  return webpack(config, function(error, stats) {
    if (error) {
      throw error;
    }

    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n');

    console.log('Webpack Finished\n');

    if (done) {
      done();
    }
  });
}

gulp.task('eslint', function () {
  return gulp.src(['../../browsers/(website-admin|website-account)/js/*.js'])
    .pipe(debug({ title: ansiColors.green('eslint:'), showFiles: false }))
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

// @() 的意思是从这一层级开始进行操作
gulp.task('copyTemplates', function() {
  return gulp.src('../../browsers/@(website-admin|website-account)/templates/pug/*')
    .pipe(gulp.dest(distPath));
});

gulp.task('copyImages', function() {
  return gulp.src('../../browsers/@(images)/**')
    .pipe(gulp.dest(distPath));
});

gulp.task('copyFonts', function() {
  return gulp.src('../../browsers/@(fonts)/**')
    .pipe(gulp.dest(distPath));
});

gulp.task('copyLibs', function() {
  return gulp.src('../../browsers/@(libs)/**')
    .pipe(gulp.dest(distPath));
});

gulp.task(
  'copyStaticFiles',
  gulp.parallel('copyTemplates', 'copyImages', 'copyFonts', 'copyLibs')
);

gulp.task('webpack-prod', function(done) {
  webpackTask(webpackProdConfig, done);
});

gulp.task('webpack-dev', function() {
  webpackTask(webpackDevConfig);
});

gulp.task('minify-css', function() {
  return gulp.src(`${distPath}/css/**/*.css`)
    .pipe(cleanCSS())
    .pipe(gulp.dest(`${distPath}/css`));
});

gulp.task('scss', function () {
  return gulp.src('../../browsers/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .on('error', notify.onError(function (error) {
      return error.message;
    }))
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest(`${distPath}/css`))
    .pipe(notify('Scss Build Successfull'));
});

gulp.task('watch', function() {
  gulp.watch('../../browsers/scss/*.scss', ['scss']);
  gulp.watch('../../browsers/images/**', ['copyImages']);
  gulp.watch('../../browsers/fonts/**', ['copyFonts']);
  gulp.watch('../../browsers/libs/**', ['copyLibs']);
});

gulp.task(
  'build',
  gulp.parallel(
    'copyStaticFiles',
    gulp.series('scss', 'minify-css'),
    gulp.series('webpack-prod')
  )
);

gulp.task(
  'default',
  gulp.series(
    gulp.parallel(
      'copyStaticFiles',
      gulp.series('scss'),
      gulp.series('webpack-dev')
    ),
    'watch'
  )
);
