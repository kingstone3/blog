import axios from 'axios';
import queryString from 'query-string';
import _ from 'lodash';


export default function request(APIEndpoint, body, options = {}) {
  return new Promise((resolve) => {
    axios({
      method: 'post',
      url: APIEndpoint,
      headers: {
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      data: queryString.stringify({
        ...body,
      }),
      ...options,
    }).then((response) => {
      window.dispatchEvent(new CustomEvent('REQUEST_SUCCESS', {
        detail: response,
      }));

      return resolve(response.data);
    }).catch((error) => {
      if (
        axios.isCancel(error) &&
        _.isFunction(options.onCancelled)
      ) {
        options.onCancelled();

        return;
      }

      if (
        !options.ignore401 &&
        error?.response.status === 401
      ) {
        window.dispatchEvent(new CustomEvent('REQUEST_ERROR_401'));
      }

      window.dispatchEvent(new CustomEvent('REQUEST_ERROR', {
        detail: error,
      }));

      // ... 的优先级低于 &&
      resolve({
        ...error?.response.data,
        status: error?.response.status,
        code: error?.response?.data.code ?? 'NETWORK_ERROR',
      });
    });
  });
}

export function apiRequest(body, options) {
  return request('/api', body, options);
}

export function internalRequest(body, options) {
  return request(`/internal_api/${body.action}`, body, options);
}

export function accountRequest(body, options) {
  options.ignore401 = true;

  return request('/api', body, options);
}
