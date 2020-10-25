import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// 路由表
const routes = [
  // 路由懒加载  进入首页不用一次加载过多资源造成用时过长！！！
  // @：相当于src目录
  { path: '/login', name: 'login', component: () => import('@/views/login') }
]

const router = new VueRouter({
  routes
})

export default router
