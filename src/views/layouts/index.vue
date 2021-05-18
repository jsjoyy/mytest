<template>
  <div class="app-container">
    <div class="layout-content ">
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view></router-view>
      </keep-alive>
      <router-view v-else></router-view>
    </div>
    <div class="layout-footer">
      <TabBar :data="tabbars" @change="handleChange"/>
    </div>
  </div>
</template>

<script>
  import TabBar from '@/components/TabBar' // 直接加载
  // const TabBar = () => import(/* webpackChunkName: "components" */ '@/components/TabBar') // 懒加载
  console.log(window)

  export default {
    name: 'AppLayout',
    data() {
      return {
        tabbars: [
          {
            title: '首页',
            to: {
              name: 'Home'
            },
            icon: 'home-o'
          },
          {
            title: '关于我',
            to: {
              name: 'About'
            },
            icon: 'user-o'
          }
        ]
      }
    },
    components: {
      TabBar
    },
    methods: {
      handleChange(v) {
        console.log('tab value:', v)
      }
    },
    created() {
      console.log(this.$cdn)
      this.$cdn = '123'
      console.log(this.$cdn)
    }
  }
</script>

<style lang="scss">
  @import "index";

  .app-container {
    .layout-footer {
      background-color: rebeccapurple;
    }
  }
</style>
