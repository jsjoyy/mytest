var sstore = {
  debug: true,
  state: {
    /* 需要管理的状态*/
    test: null,
    token: null
  },
  setTest(newVal) {
    /* 修改状态的方法*/
    this.state.test = newVal
  },
  setToken(newVal) {
    /* 修改状态的方法*/
    this.state.token = newVal
  }
}
sstore.setTest('test')
var token = window.localStorage.getItem('x-token')
if (token && token !== '') {
  sstore.setToken(token)
}
export default sstore
