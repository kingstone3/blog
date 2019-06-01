const path = require('path');
const gulp = require('gulp');
const eslint = require('gulp-eslint');
const debug = require('gulp-debug');
const notify = require('gulp-notify');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const ansiColors = require('ansi-colors');

const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');

const webpackTask = function(config, done) {
  webpack(config, function(error, stats) {
    if (error) {
      throw error;
    }

    process.stdout.write(
      stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false,
      }) + '\n'
    );

    console.log('Webpack Successful\n');

    done();
  });
};

const distPath = path.resolve('./dist');

gulp.task('eslint', function() {
  return gulp
    .src(['./(website-admin|website-account)/js/*.js'])
    .pipe(debug({ title: ansiColors.green('eslint:'), showFiles: false }))
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

// @() 的意思是从这一层级开始进行操作
gulp.task('copyTemplates', function() {
  return gulp.src('./@(website-admin|website-account)/templates/pug/*').pipe(gulp.dest(distPath));
});

gulp.task('copyImages', function() {
  return gulp.src('./@(images)/**').pipe(gulp.dest(distPath));
});

gulp.task('copyFonts', function() {
  return gulp.src('./@(fonts)/**').pipe(gulp.dest(distPath));
});

gulp.task('copyLibs', function() {
  return gulp.src('./@(libs)/**').pipe(gulp.dest(distPath));
});

gulp.task('copyStaticFiles', gulp.parallel('copyTemplates', 'copyImages', 'copyFonts', 'copyLibs'));

gulp.task('webpack-dev', function() {
  const config = require('./webpack.dev');

  const options = {
    hot: true,
    host: '127.0.0.1',
    port: 8000,
    compress: true,
    disableHostCheck: true,
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, 'dist'),
  };

  // webpackDevServer.addDevServerEntrypoints(config, options);

  const compiler = webpack(config);
  const server = new webpackDevServer(compiler, options);

  server.listen(8000, 'localhost', () => {
    console.log('webpack dev server listening on port 8000');
  });
});

gulp.task('webpack-prod', function(done) {
  const config = require('./webpack.prod');

  config.mode = 'production';

  webpackTask(config, done);
});

gulp.task('webpack-dll-dev', function(done) {
  const config = require('./webpack.dll');

  config.mode = 'development';

  webpackTask(config, done);
});

gulp.task('webpack-dll-prod', function(done) {
  const config = require('./webpack.dll');

  config.mode = 'production';

  webpackTask(config, done);
});

gulp.task('scss', function() {
  return gulp
    .src('./scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .on(
      'error',
      notify.onError(function(error) {
        return error.message;
      })
    )
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest(`./libs`));
});

gulp.task('minify-css', function() {
  return gulp
    .src(`./libs/**/*.css`)
    .pipe(cleanCSS())
    .pipe(gulp.dest(`./libs`));
});

gulp.task('watch', function() {
  gulp.watch('./scss/**/*.scss', gulp.series('scss'));
  gulp.watch('./images/**', gulp.series('copyImages'));
  gulp.watch('./fonts/**', gulp.series('copyFonts'));
  gulp.watch('./libs/**', gulp.series('copyLibs'));
});

gulp.task(
  'build',
  gulp.series(
    gulp.parallel(
      gulp.series('scss', 'minify-css'),
      gulp.series('webpack-dll-prod', 'webpack-prod')
    ),
    'copyStaticFiles'
  )
);

gulp.task('default', gulp.series('scss', 'copyStaticFiles', gulp.parallel('webpack-dev', 'watch')));
