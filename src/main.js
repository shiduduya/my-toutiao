import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入并注册vant
// 加载vant核心组件库
import Vant from 'vant';
// 加载vant全局样式
import 'vant/lib/index.css';
// 加载全局样式
import './styles/index.less'
// 设置html字体大小，设置rem单位
import 'amfe-flexible'

// 注册使用vant组件库
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
