import { adminLogger } from '<common>/logger';
import { tokenRequired } from '<common>/decorator';

import Request from '<admin>/utils/request';


class API {
  @tokenRequired
  index(req, res, next) {
    const { 'x-forwarded-for': xForwardedFor } = req.headers;
    const [ip] = xForwardedFor.split(',')

    const request = new Request(req.body, ip);
  }
}

export default new API;
