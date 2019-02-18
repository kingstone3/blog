import BaseRequest from '<common>/request';
import COMMON_CONFIG from '<common>/config';


const ADMIN_CONFIG = COMMON_CONFIG.ADMIN;

export default class Request extends BaseRequest {
  parseNameSpace() {
    return ADMIN_CONFIG.NAMESPACE;
  }

  parseUserAgent() {
    return ADMIN_CONFIG.USERAGENT;
  }

  // TODO:
  //  补全各个端的验证方式
  parseAuthorization() {
    return '';
  }
}
