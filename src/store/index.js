import Vue from 'vue'
import Vuex from 'vuex'

// 导入操作本地存储模块
import { setItem, getItem } from '@/utils/storage.js'

Vue.use(Vuex)

// 定义TOKEN_KEY的名字
const TOKEN_KEY = "TOTIAO_USER"
export default new Vuex.Store({
  state: {
    // 用户登录成功后的token
    user: getItem(TOKEN_KEY)
  },
  mutations: {
    // 设置state中的user
    setUser(state, user) {
      // 保存用户登录成功后的token
      state.user = user
      // 数据持久化
      setItem(TOKEN_KEY, user)

    }
  },
  actions: {
  },
  modules: {
  }
})
