const axios = require('axios');

const CONFIG = require('./config');

let instance = axios.create()

module.exports = class BaseRequest {
  constructor(requestParams) {
    this.requestParams = requestParams;

    this.baseURL = COMMON_CONFIG.API_BASEURL;
    this.timeout = COMMON_CONFIG.API_TIMEOUT;

    this.ip = requestParams.ip;
    this.path = requestParams.path.toLowerCase();
    this.method = requestParams.method.toLowerCase();
    this.query = this.parseQuery();

    this.userAgent = this.parseUserAgent();
    this.nameSpace = this.parseNameSpace();
    this.authorization = this.parseAuthorization();
  }
}
