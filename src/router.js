import Vue from 'vue'
import VueRouter from 'vue-router'
import nprogress from 'nprogress'

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

// 这是全局的路由导航钩子函数
// 所有的路由在导航之前必须经过这里
// 我们可以在这里定制一些特殊的通用处理
// next 表示放行
// 在这里如果不调用 next 则请求就会停留在这里
router.beforeEach((to, from, next) => {
  nprogress.start()
  next()
  nprogress.done()
})

// 导出默认
export default router
