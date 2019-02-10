// Module import
var connectRedis = require('connect-redis');
var cookieParser = require('cookie-parser');
var createError = require('http-errors');
var express = require('express');
var helmet = require('helmet');
var logger = require('morgan');
var path = require('path');
var session = require('express-session');

var CONFIG = require('./config');

// Router import
var indexRouter = require('./routes/index');
var _componentsRouter = require('./routes/componentsRouter');

// Set Express app
var app = express();

// Set view engine setup
app.set('views', path.join(__dirname, './templates/pug'));
app.set('view engine', 'pug');

app.use(logger('dev'));

// Set Redis session
var RedisStore = connectRedis(session);

app.use(session({
  store: new RedisStore({
    host: 'redis',
    port: CONFIG.REDIS_PORT,
    db: 0
  }),
  secret: '7QTwRNbHuLfgNdsexorhFYsh',
  resave: true,
  saveUninitialized: false
}));

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// url path 部分最后都会自动补全 '/'，并用 '/' 来分割 path
// 例如 url:blog.localhost => 原始 path 部分: 空 => 补全后 path: / => 分割 path: [/]
//     url:blog.localhost/_components => 原始 path 部分: /components => 补全后 path: /_components/ => 分割 path: [/_component][/]
app.use('/_components', _componentsRouter);
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
