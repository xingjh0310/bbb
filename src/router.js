import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from './components/Login/Login'
import Home from './components/Home/Home'
import Dashboard from './components/Dashboard/Dashboard'

import UserList from './components/UserList/UserList'

// 注意：在模块化工程中必须显示的执行下面的代码
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '', // 它将作为默认的 / 的出口组件
          component: Dashboard
        },
        {
          path: '/users',
          component: UserList
        }
      ]
    },
    {
      path: '/login',
      component: Login
    }
  ]
})

// 导出默认
export default router
