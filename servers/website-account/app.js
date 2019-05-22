const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const fs = require('fs');
const helmet = require("koa-helmet");
const json = require('koa-json');
const morgan = require('koa-morgan');
const onerror = require('koa-onerror');
const path = require('path');
const redisStore = require('koa-redis');
const session = require('koa-generic-session');
const views = require('koa-views');

const index = require('./routes/index');
const users = require('./routes/users');

const CONFIG = require('./common/config');


const ACCOUNT_CONFIG = CONFIG.ACCOUNT;

const accessLogStream = fs.createWriteStream(
  CONFIG.LOG_PATH + '/website_account_access.log', {
    flags: 'a'
  }
);

const app = new Koa();
app.keys = ['keys', 'keykeys'];

// error handler
onerror(app);

// middlewares
app.use(helmet({
  dnsPrefetchControl: false,
}));

app.use(session({
  store: redisStore({
    host: CONFIG.REDIS_HOST,
    port: CONFIG.REDIS_PORT,
    db: 0,
  }),
}));

app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}));
app.use(json());

app.use(views(path.join(
    __dirname,
    '../../browsers/dist/website-account/templates/pug'
  ), {
    extension: 'pug'
  }
));

// routes
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

module.exports = app;
