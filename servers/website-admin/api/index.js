import { adminLogger } from '<common>/logger';
import { tokenRequired } from '<common>/decorator';

import Request from '<admin>/utils/request';


class API {
  @tokenRequired
  index(req, res, next) {
    const {
      cookies, headers,
      body: requestParams,
    } = req;

    const {'x-forwarded-for': xForwardedFor} = headers;

    // Get user ip
    requestParams.ip = xForwardedFor.split(',');

    // Get user id
    requestParams.uid = cookie.uid;

    const request = new Request(requestParams);
  }
}

export default new API;
