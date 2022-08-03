import { createStore } from 'vuex'
export default createStore({
  state: {
    SearchValue: '',
    Jwt: JSON.parse(localStorage.getItem('jwt')) || '',
    User: JSON.parse(localStorage.getItem('user')) || ''
  },
  getters: {
  },
  mutations: {
    SetSearchValue (state, value) {
      state.SearchValue = value
      // 同时保存到本地
      const historyList = JSON.parse(localStorage.getItem('historyList')) || []
      // 不添加重复值及空值
      if (historyList.indexOf(value) === -1 && value) {
        historyList.push(value)
        localStorage.setItem('historyList', JSON.stringify(historyList))
      }
    },
    SetJwt (state, value) {
      console.log('将jwt提交到了vuex')
      state.Jwt = value
      localStorage.setItem('jwt', JSON.stringify(value))
    },
    SetUser (state, value) {
      console.log('将user提交到了vuex')
      state.User = value
      localStorage.setItem('user', JSON.stringify(value))
    }
  },
  actions: {
  },
  modules: {
  }
})
