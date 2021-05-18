// 正式
module.exports = {
  title: 'lbx-vue',
  baseUrl: 'https://localhost', // 项目地址
  baseApi: '/api', // 本地api请求地址,注意：如果你使用了代理，请设置成'/api'与proxy保持一致
  APPID: 'xxx',
  APPSECRET: 'xxx',
  $cdn: 'https://imgs.xxx.cn',
  options: {
    namespace: 'p__', // key prefix
    name: 'ls', // name variable Vue.[ls] or this.[$ls],
    storage: 'local' // storage name session, local, memory
  },
  use(env, fn) {
    env === 'p' && fn()
    return this
  }
}
