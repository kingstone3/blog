// Module import
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const session = require('express-session');
const express = require('express');
const expressWinston = require('express-winston');
const fs = require('fs');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const winston = require('winston');
const Redis = require('ioredis');

const COMMON_CONFIG = require('../common/config');

// Router import
const indexRouter = require('./routes/index');
const _componentsRouter = require('./routes/components');


// Set Express app
const app = express();

// Set view engine setup
app.set('views', path.join(__dirname, '../../browsers/dist/website-admin/templates/pug'));
app.set('view engine', 'pug');

const accessStream = fs.createWriteStream(
  `${COMMON_CONFIG.LOG_PATH}/website-admin-access.log`,
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
  secret: COMMON_CONFIG.SESSION_SECRET.admin,
  resave: true,
  saveUninitialized: false,
  cookie: {
    secure: true,
    sameSite: true
  }
}));

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// TODO:
// Component route, 网站上线后删除
app.use('/_components', _componentsRouter);

app.use(expressWinston.logger({
  transports: [
    new winston.transports.File({
      filename: `${COMMON_CONFIG.LOG_PATH}/website-admin-success.log`
    })
  ]
}));

// url path 部分最后都会自动补全 '/'，并用 '/' 来分割 path
// 例如 url:blog.localhost => 原始 path 部分: 空 => 补全后 path: / => 分割 path: [/]
//     url:blog.localhost/_components => 原始 path 部分: /components => 补全后 path: /_components/ => 分割 path: [/_component][/]
app.use('/', indexRouter);

app.use(expressWinston.errorLogger({
  transports: [
    new winston.transports.File({
      filename: `${COMMON_CONFIG.LOG_PATH}/website-admin-error.log`
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
