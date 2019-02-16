// Module import
import connectRedis from 'connect-redis';
import cookieParser from 'cookie-parser';
import createError from 'http-errors';
import express from 'express';
import expressWinston from 'express-winston';
import fs from 'fs';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import session from 'express-session';
import winston from 'winston';
import Redis from 'ioredis';

import COMMON_CONFIG from '<common>/config';

// Router import
import indexRouter from './routes/index';


// Set Express app
const app = express();

// Set view engine setup
app.set('views', path.join(
  __dirname,
  '../../../browsers/dist/website-account/templates/pug'
));
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

const RedisStore = connectRedis(session);

// Set Redis session
const redisStore = new Redis({
  host: COMMON_CONFIG.REDIS_HOST,
  port: COMMON_CONFIG.REDIS_PORT,
  db: 0
});

app.use(session({
  store: new RedisStore({
    client: redisStore
  }),
  secret: COMMON_CONFIG.SESSION_SECRET.account,
  resave: true,
  saveUninitialized: false,
  cookie: {
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
