import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from './components/Login/Login'
import Home from './components/Home/Home'

// 注意：在模块化工程中必须显示的执行下面的代码
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/login',
      component: Login
    }
  ]
})

// 导出默认
export default router
