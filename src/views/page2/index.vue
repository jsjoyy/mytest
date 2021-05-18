<!-- home -->
<template>
  <div class="index-container">
    <div class="warpper">
      <h1 class="demo-home__title"><img src="favicon.ico"/><span> LBX-VUE 开发模板</span></h1>
      <h2 class="demo-home__desc">
        A vue h5 template for mobile
      </h2>
    </div>
    <van-cell icon="" v-for="item in list" :key="item" :title="item"/>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        list: [
          '* [Eslint+Pettier 统一代码规范，强校验与修复]',
          '* [配置多环境变量]',
          '* [rem 适配方案 + viewPort]',
          '* [bassCSS + Scss 全局样式]',
          '* [actionClass + UI标准要素]',
          '* [VantUI 组件按需加载]',
          '* [Vuex 状态管理]',
          '* [Vue-router]',
          '* [Axios 封装及接口管理]',
          '* [配置 alias 别名]',
          '* [配置 proxy 跨域]',
          '* [条件编译日志console.log]',
          '* [懒加载]',
          '* [添加 IE 兼容]'
        ]
      }
    },

    computed: {},

    mounted() {
      console.log(all)
    },

    methods: {}
  }
</script>
<style lang="scss" scoped>
  .index-container {
    .warpper {
      padding: 12px;
      background: #fff;

      .demo-home__title {
        margin: 0 0 6px;
        font-size: 32px;

        .demo-home__title img,
        .demo-home__title span {
          display: inline-block;
          vertical-align: middle;
        }

        img {
          width: 32px;
        }

        span {
          margin-left: 16px;
          font-weight: 500;
        }
      }

      .demo-home__desc {
        margin: 0 0 20px;
        color: rgba(69, 90, 100, 0.6);
        font-size: 14px;
      }
    }
  }
</style>
