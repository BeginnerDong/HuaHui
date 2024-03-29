/**
 * Created by sailengsi on 2017/5/14.
 */

import  ajax  from 'utils/ajax'
import request from 'apis/'

var plugins = {}
for (var i = 0; i < request.length; i++) {
  if (typeof request[i] === 'object' && request[i].list && Array.isArray(request[i].list)) {
    for (var j = 0; j < request[i].list.length; j++) {
      plugins['api_' + request[i].module + '_' + request[i].list[j].method] = (function (n, m) {
        return function ({type = request[n].list[m].type, path = request[n].list[m].path, pathParams, data, fn, errFn,tokenFlag = request[n].list[m].tokenFlag||true, headers, opts} = {}) {
          // request[n].list[m].type, request[n].list[m].path, data, fn, opts
          return ajax.call(this, {
            type,
            pathParams,
            path,
            data,
            fn,
            errFn,
            tokenFlag,
            headers,
            opts
          })
        }
      })(i, j)
    }
  }
}

console.log(plugins);

export default plugins
