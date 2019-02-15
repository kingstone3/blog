import expressWinston from 'express-winston';
import winston from 'winston';

import COMMON_CONFIG from '<common>/config';


function createLogger(server) {
  return winston.createLogger({
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({
        filename: `${COMMON_CONFIG.LOG_PATH}/${server}.log`
      })
    ]
  })
}

const accountLogger = createLogger('website-account');
const adminLogger = createLogger('website-admin');

export default {
  accountLogger: accountLogger.info,
  adminLogger: accountLogger.info
}
