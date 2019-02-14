var redis = require('redis');

var COMMON_CONFIG = require('../common/config');


var cache = redis.createClient({
  host: 'redis',
  port: COMMON_CONFIG.REDIS_PORT,
  db: 1
});

cache.on('error', function (err) {
  console.log(`Cache error: ${err}`);
});

module.exports = cache;
