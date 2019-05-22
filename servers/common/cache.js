const redisStore = require('koa-redis');

const CONFIG = require('./config');


const cache = redisStore({
  host: CONFIG.REDIS_HOST,
  port: CONFIG.REDIS_PORT,
  db: 0,
});

cache.on('error', (err) => {
  console.log(`Cache error: ${err}`);
});


module.exports = cache;
