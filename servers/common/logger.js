const expressWinston = require('express-winston');
const winston = require('winston');

const COMMON_CONFIG = require('../common/config');


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

module.exports = {
  account: accountLogger.info,
  admin: accountLogger.info
}
