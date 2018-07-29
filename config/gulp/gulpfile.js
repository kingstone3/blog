const path = require('path');
const gulp = require('gulp');
const notify = require('gulp-notify');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const rename = require('gulp-rename');

const webpack = require('webpack');
const webpackDevConfig = require('../webpack/webpack.dev');
const webpackProdConfig = require('../webpack/webpack.prod');

const distPath = path.resolve('../../dist');

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


gulp.task('copyTemplates', function() {
  return gulp.src('../../browser/@(templates)/**')
    .pipe(gulp.dest(distPath));
});

gulp.task('copyImages', function() {
  return gulp.src('../../browser/@(images)/**')
    .pipe(gulp.dest(distPath));
})

gulp.task('copyFonts', function() {
  return gulp.src('../../browser/@(fonts)/**')
    .pipe(gulp.dest(distPath));
})

gulp.task('copyLibs', function() {
  return gulp.src('../../browser/@(libs)/**')
    .pipe(gulp.dest(distPath));
})

gulp.task('copyStaticFiles', ['copyTemplates', 'copyImages', 'copyFonts', 'copyLibs']);

gulp.task('scss', function () {
  return gulp.src('../../browser/scss/*.scss')
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

gulp.task('webpack-dev', function() {
  webpackTask(webpackDevConfig);
});

gulp.task('webpack-prod', function() {
  webpackTask(webpackProdConfig);
});

gulp.task('watch', [
  'copyStaticFiles', 'scss', 'webpack-dev',
], function() {
  gulp.watch('../../browser/scss/*.scss', ['scss']);
  gulp.watch('../../browser/templates/**', ['copyTemplates']);
  gulp.watch('../../browser/fonts/**', ['copyFonts']);
})

gulp.task('build', ['copyStaticFiles', 'scss', 'minify-css', 'webpack-prod']);

gulp.task('default', ['watch']);
