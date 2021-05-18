<!-- home -->
<template>
  <div class="about-container">
    <div class="warpper">
      <div class="list">
        <div class="logo"></div>
        <div class="demo-home__title" @click="addarr()">VUE H5开发模板{{ b }}</div>
        <div class="item">
          项目地址:
          <a href="https://xcx.lbxcn.com/super/test/newh5/index.html"
            >https://xcx.lbxcn.com/super/test/newh5/index.html</a
          >
        </div>
        <van-cell-group>
          <van-field style="font-size: 16px;margin-bottom: 10px;" label="文本" placeholder="请输入用户名" />
          <van-field style="font-size: 16px;" type="password" label="密码" />
        </van-cell-group>
        <van-button @click="click()" style="font-size: 20px;" type="primary" block>登录</van-button>
        <div class="item">作者: tony军</div>
        <div class="item"></div>
        <div class="item" @click="addobj()">关注老百姓前端技术群</div>
      </div>
    </div>
  </div>
</template>

<script>
// 请求接口
import { getUserInfo } from '@/api/user.js'

export default {
  data() {
    return {
      data: {
        name: '',
        password: ''
      }
    }
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    b() {
      if (this.data.b instanceof Array) {
        return this.data.b[0].b
      }
    },
    // eslint-disable-next-line vue/return-in-computed-property
    c() {
      if (this.data.c instanceof Object) {
        return this.data.c.c
      }
    }
  },
  created() {},
  mounted() {
    this.setData({
      a: [1, 2],
      b: [{ b: 'b' }],
      c: { c: [321] }
    })
  },
  methods: {
    // 请求数据案例
    initData() {
      // 请求接口数据，仅作为展示，需要配置src->config下环境文件
      const params = { user: 'tony' }
      getUserInfo(params)
        .then(() => {})
        .catch(() => {})
    },
    // Action 通过 store.dispatch 方法触发
    doDispatch() {},
    addarr() {
      this.setData({
        a: [1, 2],
        b: [{ b: 'bbbbb' }],
        c: { c: [321] }
      })
      this.data.b[0].b = 'ccccc'
      console.log(this.data)
    },
    addobj() {},
    click() {
      this.name
    }
  }
}
</script>
<style lang="scss">
.about-container {
  .van-cell__value {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* 你的命名空间 */
  background: #fff;
  height: 100vh;
  box-sizing: border-box;

  .warpper {
    padding: 50px 12px 12px 12px;

    .list {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #666;
      font-size: 14px;

      .demo-home__title {
        margin: 0 0 6px;
        font-size: 32px;

        .demo-home__title img,
        .demo-home__title span {
          display: inline-block;
          vertical-align: middle;
        }
      }

      .item {
        font-size: 14px;
        line-height: 34px;

        a {
          text-decoration: underline;
        }

        .van-button {
          /* vant-ui 元素*/
          background: #ff5500;
        }
      }

      .logo {
        width: 120px;
        height: 120px;
        background: url('//favicon.ico') center / contain no-repeat;
      }

      .wechat {
        width: 200px;
        height: 200px;

        img {
          width: 100%;
          height: auto;
        }
      }
    }
  }
}
</style>
