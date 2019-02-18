import axios from 'axios';

import COMMON_CONFIG from '<common>/config';

let instance = axios.create()

export default class BaseRequest {
  constructor(requestParams, ip) {
    this.requestParams = requestParams;

    this.baseURL = COMMON_CONFIG.API_BASEURL;
    this.timeout = COMMON_CONFIG.API_TIMEOUT;

    this.ip = ip;

    this.method = this.parseMethod();
    this.path = this.parsePath();
    this.nameSpace = this.parseNameSpace();
    this.userAgent = this.parseUserAgent();
    this.authorization = this.parseAuthorization();
  }
}
