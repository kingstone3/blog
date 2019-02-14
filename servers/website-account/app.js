// Module import
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const express = require('express');
const expressWinston = require('express-winston');
const fs = require('fs');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const winston = require('winston');
const Redis = require('ioredis');

const COMMON_CONFIG = require('<common>/config');

// Router import
const indexRouter = require('./routes/index');

// Set Express app
const app = express();

// Set view engine setup
app.set('views', path.join(__dirname, '../../browsers/dist/website-account/templates/pug'));
app.set('view engine', 'pug');

const accessStream = fs.createWriteStream(
  `${COMMON_CONFIG.LOG_PATH}/website-account-access.log`,
  {
    flags: 'a'
  }
);

app.use(morgan(
  'combined',
  {
    stream: accessStream
  }
));

// Set Redis session
const redisStore = new Redis({
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

app.use(expressWinston.logger({
  transports: [
    new winston.transports.File({
      filename: `${COMMON_CONFIG.LOG_PATH}/website-account-success.log`
    })
  ]
}));

app.use('/', indexRouter);

app.use(expressWinston.errorLogger({
  transports: [
    new winston.transports.File({
      filename: `${COMMON_CONFIG.LOG_PATH}/website-account-error.log`
    })
  ]
}));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
