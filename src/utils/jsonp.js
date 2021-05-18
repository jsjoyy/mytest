import originJSONP from 'jsonp'
import { baseApi } from '@/config'

export default function jsonp(url = '', data, option) {
  url = url || ''
  url = url.indexOf('://') < 0 ? baseApi + url : url
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
  if (!(option instanceof Object)) {
    option = {}
  }
  option = Object.assign({}, option, {
    timeout: 3000
  })
  return new Promise((resolve, reject) => {
    originJSONP(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

function param(data) {
  let url = ''
  for (var k in data) {
    const value = data[k] !== undefined ? data[k] : ''
    url += `&${k}=${encodeURIComponent(value)}`
  }
  // 删除第一个&
  return url ? url.substring(1) : ''
}
