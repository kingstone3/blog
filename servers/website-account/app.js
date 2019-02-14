// Module import
var cookieParser = require('cookie-parser');
var createError = require('http-errors');
var express = require('express');
var helmet = require('helmet');
var logger = require('morgan');
var path = require('path');
var session = require('express-session');
var Redis = require('ioredis');

var COMMON_CONFIG = require('../common/config');

// Router import
var indexRouter = require('./routes/index');

// Set Express app
var app = express();

// Set view engine setup
app.set('views', path.join(__dirname, '../../browsers/dist/website-account/templates/pug'));
app.set('view engine', 'pug');

app.use(logger('dev'));

// Set Redis session
var redisStore = new Redis({
  host: 'redis',
  port: COMMON_CONFIG.REDIS_PORT,
  db: 0
});

app.use(session({
  store: redisStore,
  secret: COMMON_CONFIG.SESSION_SECRET.account,
  resave: true,
  saveUninitialized: false,
  cookie: {
    secure: true,
    sameSite: true
  }
}));

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());

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
