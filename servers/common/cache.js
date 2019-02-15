import Redis from 'ioredis';

import COMMON_CONFIG from '<common>/config';


const cache = new Redis({
  host: COMMON_CONFIG.REDIS_HOST,
  port: COMMON_CONFIG.REDIS_PORT,
  db: 0
});

cache.on('error', (err) => {
  console.log(`Cache error: ${err}`);
});

export default cache;
