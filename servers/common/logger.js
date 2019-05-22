const winston = require('winston');

const COMMON = require('./config');


function createLogger(server) {
  return winston.createLogger({
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({
        filename: `${COMMON.LOG_PATH}/${server}.log`
      }),
    ]
  });
}


exports.accountLogger = createLogger('website-account');
exports.adminLogger = createLogger('website-admin');
