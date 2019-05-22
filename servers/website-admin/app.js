const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const helmet = require("koa-helmet");
const json = require('koa-json');
const logger = require('koa-logger');
const onerror = require('koa-onerror');
const path = require('path');
const redisStore = require('koa-redis');
const session = require('koa-generic-session');
const views = require('koa-views');

const index = require('./routes/index');
const users = require('./routes/users');

const CONFIG = require('./common/config');


const ADMIN_CONFIG = CONFIG.ADMIN;

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
app.use(logger());

app.use(views(path.join(
    __dirname,
    '../../browsers/dist/website-admin/templates/pug'
  ), {
    extension: 'pug'
  }
));

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

module.exports = app;
