const Redis = require('ioredis');

const COMMON_CONFIG = require('<common>/config');


const cache = new Redis({
  host: 'redis',
  port: COMMON_CONFIG.REDIS_PORT,
  db: 0
});

cache.on('error', (err) => {
  console.log(`Cache error: ${err}`);
});

module.exports = cache;
