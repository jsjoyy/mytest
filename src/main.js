// 兼容 IE
// https://github.com/zloirock/core-js/blob/master/docs/2019-03-19-core-js-3-babel-and-a-look-into-the-future.md#babelpolyfill
import 'core-js/stable'
import 'regenerator-runtime/runtime'
// import 'babel-polyfill' // 兼容winphone ie

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vconsole from 'vconsole'
// 设置 js中可以访问 $cdn
import { $cdn } from '@/config'
import config from '@/config'
// 全局引入按需引入UI库 vant
import '@/plugins/vant'
// 引入全局样式
import '@/assets/css/index.scss'
// 移动端适配
import 'lib-flexible/flexible.js'
// filters
import './filters'
// 图片懒加载
import VueLazyload from 'vue-lazyload'
import Storage from 'vue-ls'
import md5 from 'md5'
import jsonp from './utils/jsonp'
import sstore from '@/utils/sstore'

Vue.prototype.setData = function(obj) {
  this.data = Object.assign({}, this.data, obj)
}
Vue.prototype.$sstore = sstore
Vue.prototype.$cdn = $cdn
Vue.prototype.$jsonp = jsonp

Vue.config.productionTip = false // todo: Vue.config

config.use('d', function() {
  localStorage.setItem('vConsole_switch_x', 50)
  localStorage.setItem('vConsole_switch_y', 250)
  Vue.use(new Vconsole())
})

Vue.use(md5)
Vue.use(Storage, config.options)
Vue.use(VueLazyload, {
  error: 'dist/error.png', // 这个是请求失败后显示的图片
  loading: 'dist/loading.gif', // 这个是加载的loading过渡效果
  try: 2 // 这个是加载图片数量
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
