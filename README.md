# lbx-vue
基于 vue-cli4.0 + webpack 4 + vant ui + sass+ rem 适配方案+axios 封装，构建移动端工程化开发模板

### 目录
[Vue-cli4 移动端开发框架工程化环境]
* [Eslint+Pettier 统一代码规范，强校验与修复]
* [配置多环境变量]
* [rem 适配方案 + viewPort]
* [bassCSS + Scss 全局样式]
* [actionClass + UI标准要素]
* [VantUI 组件按需加载]
* [Vuex 状态管理]
* [Vue-router]
* [Axios 封装及接口管理]
* [配置 alias 别名]
* [配置 proxy 跨域]
* [条件编译日志console.log]
* [按需引入]
* [模块懒加载]
* [添加 IE 兼容]
* [添加 jsonp]
* [添加 md5]
* [添加 图片懒加载]


### 启动项目
```bash
cd lbx-vue
npm install
npm run serve
```
`package.json` 里的 `scripts` 配置 `serve` `stage` `build`，通过 `--mode xxx` 来执行不同环境

- 通过 `npm run serve` 启动本地 , 执行 `development`
- 通过 `npm run stage` 打包测试 , 执行 `staging`
- 通过 `npm run build` 打包正式 , 执行 `production`

```javascript
"scripts": {
  "serve": "vue-cli-service serve --open",
  "stage": "vue-cli-service build --mode staging",
  "build": "vue-cli-service build",
}
```


### 配置环境
`VUE_APP_` 开头的变量，在代码中可以通过 `process.env.VUE_APP_` 访问。  
`VUE_APP_ENV = 'development'` 通过`process.env.VUE_APP_ENV` 访问。  
`VUE_APP_*` 变量之外，在你的应用代码中始终可用的还有两个特殊的变量`NODE_ENV` 和`BASE_URL`
在项目根目录中新建`.env.*`
- .env.development 本地开发环境配置
```bash
NODE_ENV='development'
# must start with VUE_APP_
VUE_APP_ENV = 'development'

```
- .env.staging 测试环境配置

```bash
NODE_ENV='production'
# must start with VUE_APP_
VUE_APP_ENV = 'staging'
```

- .env.production 正式环境配置

```bash
 NODE_ENV='production'
# must start with VUE_APP_
VUE_APP_ENV = 'production'
```

只定义了基础的 VUE_APP_ENV `development` `staging` `production`  
变量统一在 `src/config/env.*.js` 里进行管理。

config/index.js

```javascript
// 根据环境引入不同配置 process.env.NODE_ENV
const config = require('./env.' + process.env.VUE_APP_ENV)
module.exports = config
```

配置对应环境的变量，拿本地环境文件 `env.development.js` 举例，用户可以根据需求修改

```javascript
// 本地环境配置
module.exports = {
  title: 'vue',
  baseUrl: 'http://localhost:9020', // 项目地址
  baseApi: 'https://test.xxx.com/api', // 本地api请求地址
  APPID: 'xxx',
  APPSECRET: 'xxx'
}
```
环境不同，变量就会不同
```javascript
// 根据环境不同引入不同baseApi地址
import { baseApi } from '@/config'
console.log(baseApi)
```



### rem 适配方案
Vant 中的样式默认使用`px`作为单位，如果需要使用`rem`单位，使用以下两个工具:
- [postcss-pxtorem](https://github.com/cuth/postcss-pxtorem) 是一款 `postcss` 插件，用于将单位转化为 `rem`
- [lib-flexible](https://github.com/amfe/lib-flexible) 用于设置 `rem` 基准值
##### PostCSS 配置
下面提供了一份基本的 `postcss` 配置，可以在此配置的基础上根据项目需求进行修改
```javascript
// https://github.com/michael-ciniawsky/postcss-load-config
module.exports = {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: ['Android 4.1', 'iOS 7.1', 'Chrome > 31', 'ff > 31', 'ie >= 8']
    },
    'postcss-pxtorem': {
      rootValue: 37.5,
      propList: ['*']
    }
  }
}
```
```html
<img class="image" src="" />
<style>
  /* rootValue: 75 */
  .image {
    width: 750px;
    height: 1334px;
  }
  /* rootValue: 37.5 */
  .image {
    width: 375px;
    height: 667px;
  }
</style>
```
**viewport,可以用布局宽高强关联，或者等比缩放视图**
```html
<img class="image" src="" />
<style>
  /* rootValue: 75 */
  .image {
    width: 100vw;
    height: 100vh;
  }
  .image {
    width: 100vw;
    height: 100vw;
  }
  .image {
    width: 100vh;
    height: 100vh;
  }
</style>
<script>
    const pxtoviewport = require('postcss-px-to-viewport');
</script>
```




### bassCSS Sass 全局样式
```css
html,
body .app {
  color: #333333;
  font-family: Arial, Helvetica, 'STHeiti STXihei', 'Microsoft YaHei', Tohoma, sans-serif;
  background-color: $background-color;
}
```

每个页面自己对应的样式都写在自己的 .vue 文件之中 `scoped` 它顾名思义给 css 加了一个域的概念。
```html
<style lang="scss">
  /* global styles */
</style>

<style lang="scss" scoped>
  /* local styles */
</style>
```
#### 目录结构
lbx-vue 所有全局样式都在 `@/src/assets/css` 目录下设置
```bash
├── assets
│   ├── css
│   │   ├── index.scss               # 全局通用样式
│   │   ├── m_util.scss               # actionScss
│   │   ├── mixin.scss               # 全局mixin
│   │   └── variables.scss           # 全局变量
```
#### 修改当前页面的vant-ui 样式
现在我们来说说怎么重写 `vant-ui` 样式。由于 `vant-ui` 的样式我们是在全局引入的，所以你想在某个页面里面覆盖它的样式就不能
加 `scoped`，但你又想只覆盖这个页面的 `vant` 样式，你就可在它的父级加一个 `class`，用命名空间来解决问题。

#### 全局变量
`vue.config.js` 配置使用 `css.loaderOptions` 选项,注入 `sass` 的 `mixin` `variables` 到全局，不需要手动引入 ,配
置`$cdn`通过变量形式引入 cdn 地址,这样向所有 Sass/Less 样式传入共享的全局变量：
```javascript
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)
const defaultSettings = require('./src/config/index.js')
module.exports = {
  css: {
    extract: IS_PROD,
    sourceMap: false,
    loaderOptions: {
      // 给 scss-loader 传递选项
      scss: {
        // 注入 `sass` 的 `mixin` `variables` 到全局, $cdn可以配置图片cdn
        // 详情: https://cli.vuejs.org/guide/css.html#passing-options-to-pre-processor-loaders
        prependData: `
                @import "assets/css/mixin.scss";
                @import "assets/css/variables.scss";
                $cdn: "${defaultSettings.$cdn}";
                 `
      }
    }
  }
}
```

设置 js 中可以访问 `$cdn`,`.vue` 文件中使用`this.$cdn`访问

```javascript
// 引入全局样式
import '@/assets/css/index.scss'

// 设置 js中可以访问 $cdn
// 引入cdn
import { $cdn } from '@/config'
Vue.prototype.$cdn = $cdn
```

在 css 和 js 使用

```html
<script>
  console.log(this.$cdn)
</script>
<style lang="scss" scoped>
  .logo {
    width: 120px;
    height: 120px;
    background: url($cdn+'/weapp/logo.png') center / contain no-repeat;
  }
</style>
```




### actionClass + UI标准要素
**m_utl.scss是一个用来操作dom的css样式类文件，现代的移动端h5开发样式少，操作大体一致，
使用css常用样式封装的样式类文件进行动态绘制，高效快捷。**
**和UI约定UI标准要素，将mg/pd/font等等标准化**
**组件样式套件封装则按功能命名**
```html
<style>
.m_xx{
    margin: xxpx;
}
.mt30{
    margin-top: 30px;
}
.p_xx{
    padding-top: 30px;
}
.pt10{
    padding: xxpx;
}
</style>
<div class="m_xx p_xx">
    <div class="mt30 pt10"></div>
</div>
```




### VantUI组件按需加载
[babel-plugin-import](https://github.com/ant-design/babel-plugin-import) 是一款 `babel` 插件，它会在编译过程中将
`import` 的写法自动转换为按需引入的方式
#### 安装插件
```bash
npm i babel-plugin-import -D
```
在`babel.config.js` 设置
```javascript
// 对于使用 babel7 的用户，可以在 babel.config.js 中配置
const plugins = [
  [
    'import',
    {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    },
    'vant'
  ]
]
module.exports = {
  presets: [['@vue/cli-plugin-babel/preset', { useBuiltIns: 'usage', corejs: 3 }]],
  plugins
}
```
#### 使用组件
项目在 `src/plugins/vant.js` 下统一管理组件，用哪个引入哪个，无需在页面里重复引用
```javascript
// 按需全局引入 vant组件
import Vue from 'vue'
import { Button, List, Cell, Tabbar, TabbarItem } from 'vant'
Vue.use(Button)
Vue.use(Cell)
Vue.use(List)
Vue.use(Tabbar).use(TabbarItem)
```



### Vuex 状态管理

目录结构

```bash
├── store
│   ├── modules
│   │   └── app.js
│   ├── index.js
│   ├── getters.js
```

`main.js` 引入

```javascript
import Vue from 'vue'
import App from './App.vue'
import store from './store'
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
```
使用
```html
<script>
  import { mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters(['userName'])
    },
    methods: {
      // Action 通过 store.dispatch 方法触发
      doDispatch() {
        this.$store.dispatch('setUserName', '***~')
      }
    }
  }
</script>
```



### Vue-router
本案例采用 `hash` 模式，开发者根据需求修改 `mode` `base`
**注意**：如果你使用了 `history` 模式，`vue.config.js` 中的 `publicPath` 要做对应的**修改**
```javascript
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export const router = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/views/home/index'), // 路由懒加载
    meta: {
      title: '首页', // 页面标题
      keepAlive: false // keep-alive 标识
    }
  }
]
const createRouter = () =>
  new Router({
    // mode: 'history', // 如果你是 history模式 需要配置 vue.config.js publicPath
    // base: '/app/',
    scrollBehavior: () => ({ y: 0 }),
    routes: router
  })

export default createRouter()
```



### Axios 封装及接口管理

`utils/request.js` 封装 axios ,开发者需要根据后台接口做修改。

- `service.interceptors.request.use` 里可以设置请求头，比如设置 `token`
- `config.hideloading` 是在 api 文件夹下的接口参数里设置，下文会讲
- `service.interceptors.response.use` 里可以对接口返回数据处理，比如 401 删除本地信息，重新登录

```javascript
import axios from 'axios'
import store from '@/store'
import { Toast } from 'vant'
// 根据环境不同引入不同api地址
import { baseApi } from '@/config'
// create an axios instance
const service = axios.create({
  baseURL: baseApi, // url = base api url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request 拦截器 request interceptor
service.interceptors.request.use(
  config => {
    // 不传递默认开启loading
    if (!config.hideloading) {
      // loading
      Toast.loading({
        forbidClick: true
      })
    }
    if (store.getters.token) {
      config.headers['X-Token'] = ''
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)
// respone拦截器
service.interceptors.response.use(
  response => {
    Toast.clear()
    const res = response.data
    if (res.status && res.status !== 200) {
      // 登录超时,重新登录
      if (res.status === 401) {
        store.dispatch('FedLogOut').then(() => {
          location.reload()
        })
      }
      return Promise.reject(res || 'error')
    } else {
      return Promise.resolve(res)
    }
  },
  error => {
    Toast.clear()
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)
export default service
```

#### 接口管理
在`src/api` 文件夹下统一管理接口
- 你可以建立多个模块对接接口, 比如 `home.js` 里是首页的接口这里讲解 `user.js`
- `url` 接口地址，请求的时候会拼接上 `config` 下的 `baseApi`
- `method` 请求方法
- `data` 请求参数 `qs.stringify(params)` 是对数据系列化操作
- `hideloading` 默认 `false`,设置为 `true` 后，不显示 loading ui 交互中有些接口不需要让用户感知
```javascript
import qs from 'qs'
// axios
import request from '@/utils/request'
//user api
// 用户信息
export function getUserInfo(params) {
  return request({
    url: '/user/userinfo',
    method: 'post',
    data: qs.stringify(params),
    hideloading: true // 隐藏 loading 组件
  })
}
```
**如何调用**
```javascript
// 请求接口
import { getUserInfo } from '@/api/user.js'

const params = { user: 'tony' }
getUserInfo(params)
  .then(() => {})
  .catch(() => {})
```



### 配置 alias 别名
```javascript
const path = require('path')
const resolve = dir => path.join(__dirname, dir)
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)

module.exports = {
  chainWebpack: config => {
    // 添加别名
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('api', resolve('src/api'))
      .set('views', resolve('src/views'))
      .set('components', resolve('src/components'))
  }
}
```



### 配置 proxy 跨域
**!!!注意：你还需要将 `src/config/env.development.js` 里的 `baseApi` 设置成 '/'**
```javascript
module.exports = {
  devServer: {
    // ....
    proxy: {
      //配置跨域
      '/api': {
        target: 'https://test.xxx.com', // 接口的域名
        // ws: true, // 是否启用websockets
        changOrigin: true, // 开启代理，在本地创建一个虚拟服务端
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  }
}
```
例如: `src/api/home.js`

```javascript
export function getUserInfo(params) {
  return request({
    url: '/api/userinfo',
    method: 'post',
    data: qs.stringify(params)
  })
}
```



### 添加 IE 兼容

之前的方式 会报 `@babel/polyfill` is deprecated. Please, use required parts of `core-js` and
`regenerator-runtime/runtime` separately

`@babel/polyfill` 废弃，使用 `core-js` 和 `regenerator-runtime`

```bash
npm i --save core-js regenerator-runtime
```

在 `main.js` 中添加

```javascript
// 兼容 IE
// https://github.com/zloirock/core-js/blob/master/docs/2019-03-19-core-js-3-babel-and-a-look-into-the-future.md#babelpolyfill
import 'core-js/stable'
import 'regenerator-runtime/runtime'
```

配置 `babel.config.js`

```javascript
const plugins = []

module.exports = {
  presets: [['@vue/cli-plugin-babel/preset', { useBuiltIns: 'usage', corejs: 3 }]],
  plugins
}
```
