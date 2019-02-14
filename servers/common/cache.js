var Redis = require('ioredis');

var COMMON_CONFIG = require('../common/config');


var cache = new Redis({
  host: 'redis',
  port: COMMON_CONFIG.REDIS_PORT,
  db: 0
});

cache.on('error', function (err) {
  console.log(`Cache error: ${err}`);
});

module.exports = cache;
