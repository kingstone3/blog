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

const distPath = path.resolve('../../browser/dist');

const webpackTask = function(config) {
  webpack(config, function(error, stats) {
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
  });
}

// @() 的意思是从这一层级开始进行操作
gulp.task('copyImages', function() {
  return gulp.src('../../browser/src/@(images)/**')
    .pipe(gulp.dest(distPath));
})

gulp.task('copyFonts', function() {
  return gulp.src('../../browser/src/@(fonts)/**')
    .pipe(gulp.dest(distPath));
})

gulp.task('copyLibs', function() {
  return gulp.src('../../browser/src/@(libs)/**')
    .pipe(gulp.dest(distPath));
})

gulp.task('copyStaticFiles', ['copyImages', 'copyFonts', 'copyLibs']);

gulp.task('scss', function () {
  return gulp.src('../../browser/src/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .on('error', notify.onError(function (error) {
      return error.message;
    }))
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest(`${distPath}/css`))
    .pipe(notify('Scss Build Successfull'));
});

gulp.task('minify-css', ['scss'], function() {
  return gulp.src(`${distPath}/css/*.css`)
    .pipe(cleanCSS())
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(gulp.dest(`${distPath}/css`));
});

gulp.task('eslint', function () {
  return gulp.src(['../../browser/src/js/*.js'])
    .pipe(debug({ title: ansiColors.green('eslint:'), showFiles: false }))
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});


gulp.task('webpack-dev', function() {
  webpackTask(webpackDevConfig);
});

gulp.task('webpack-prod', function() {
  webpackTask(webpackProdConfig);
});

gulp.task('build', ['copyStaticFiles', 'scss', 'minify-css', 'webpack-prod']);

gulp.task('default', [
  'copyStaticFiles', 'scss', 'webpack-dev',
], function() {
  gulp.watch('../../browser/scss/*.scss', ['scss']);
  gulp.watch('../../browser/fonts/**', ['copyFonts']);
});
