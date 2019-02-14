const path = require('path');
const gulp = require('gulp');
const eslint = require('gulp-eslint');
const debug = require('gulp-debug');
const ansiColors = require('ansi-colors');

const webpack = require('webpack');
const webpackDevConfig = require('./webpack.dev');
const webpackProdConfig = require('./webpack.prod');

const distPath = path.resolve('./dist');

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

gulp.task('webpack-prod', function(done) {
  webpackTask(webpackProdConfig, done);
});

gulp.task('webpack-dev', function() {
  webpackTask(webpackDevConfig);
});

gulp.task(
  'build',
  gulp.series('webpack-prod')
);

gulp.task(
  'default',
  gulp.series('webpack-dev')
);
