import Vue from 'vue'
import VueRouter from 'vue-router'
import nprogress from 'nprogress'

import Login from './components/login/login'
import Home from './components/home/home'
import Dashboard from './components/dashboard/dashboard'

import UserList from './components/user-list/user-list'

import TeacherList from './components/teacher-list/teacher-list'
import TeacherNew from './components/teacher-new/teacher-new'
import TeacherEdit from '@/teacher-edit/teacher-edit'

import CourseList from './components/course-list/course-list' // 课程列表
import CourseNew from './components/course-new/course-new' // 新建课程
import CourseEdit from './components/course-edit/course-edit' // 编辑课程基本信息
import CourseEditPicture from './components/course-edit-picture/course-edit-picture' // 编辑课程图片
import CourseEditLesson from './components/course-edit-lesson/course-edit-lesson' // 编辑课程课时信息

import SettingsProfile from './components/settings-profile/settings-profile'
import SettingsAdmin from './components/settings-admin/settings-admin'

import CrouseCategoryList from '@/course-category/course-category'
import CrouseCategoryNew from '@/course-category-new/course-category-new'

import NotFound from '@/not-found/not-found'


// 注意：在模块化工程中必须显示的执行下面的代码
Vue.use(VueRouter)

const router = new VueRouter({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '', // 它将作为默认的 / 的出口组件
          component: Dashboard,
          meta: { requiresAuth: true } // 告诉导航钩子，我需要登陆权限
        },
        {
          path: '/users',
          component: UserList,
          meta: { requiresAuth: true } // 专门存储路由对象的特殊属性
        },
        {
          path: '/teachers',
          component: TeacherList,
          meta: { requiresAuth: true }
        },
        {
          path: '/teachers/new',
          component: TeacherNew,
          meta: { requiresAuth: true }
        },
        {
          name: 'teacher-edit',
          path: '/teachers/:teacherId/edit',
          component: TeacherEdit,
          meta: { requiresAuth: true }
        },
        {
          path: '/settings/profile',
          component: SettingsProfile,
          meta: { requiresAuth: true }
        },
        {
          path: '/settings/admin',
          component: SettingsAdmin,
          meta: { requiresAuth: true }
        },
        {
          path: '/course',
          component: CourseNew,
          meta: { requiresAuth: true }
        },
        {
          path: '/course/:courseId/edit/picture',
          component: CourseEditPicture,
          meta: { requiresAuth: true }
        },
        {
          path: '/course/:courseId/edit/lesson',
          component: CourseEditLesson,
          meta: { requiresAuth: true }
        },
        {
          path: '/course/:courseId/edit',
          component: CourseEdit,
          meta: { requiresAuth: true }
        },
        {
          path: '/course_category',
          component: CrouseCategoryList,
          meta: { requiresAuth: true }
        },
        {
          path: '/course_category/new',
          component: CrouseCategoryNew,
          meta: { requiresAuth: true }
        }
      ]
    },
    {
      path: '/login',
      component: Login
    },{
      path: '/not_found',
      component: NotFound
    }
  ]
})

router.beforeEach((to, from, next) => {
  nprogress.start()
  // 如果当前导航的路由需要登陆
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    // 该路由需要授权，检查是否已登录
    // 如果没有登陆，则跳转到登录页
    const isLogin = window.localStorage.getItem('bxg-token')
    if (!isLogin) {
      // 跳转到登录页
      next({
        path: '/login',
        query: { redirect: to.fullPath } // query 对象会被转换为查询字符串放到 /login? 之后, 那么登陆成功之后应该跳转会这里
      })
    } else {
      // 登陆成功，通过
      next()
    }
  } else {
    next() // 不需要验证登陆权限的
  }
  // 在这里调用不合适
  // 因为后面可能还有别的守卫在拦截
  // nprogress.done()
})

// 在这里可以做一些导航完成之后的收尾工作
// 例如如果路由的局部钩子不放行,则这里也不会被调用到
router.afterEach((to, from) => {
  nprogress.done()
})

// 这是全局的路由导航钩子函数
// 所有的路由在导航之前必须经过这里
// 我们可以在这里定制一些特殊的通用处理
// next 表示放行
// 在这里如果不调用 next 则请求就会停留在这里
// router.beforeEach((to, from, next) => {
//   // to 要去的路由
//   // from 从哪个路由来的
//   // 校验是否登陆
//   console.log(to)
//   // 只要请求路径不是 /login 则我就验证你的登陆权限
//   // if (!window.localStorage.getItem('bxg-token')) {
//   //   // 没有登陆
//   //   // console.log(111)
//   //   // 你在实例中的 this.$router 其实就是这里的 router 实例
//   //   // console.log(router.push)
//   //   console.log(111)
//   //   return router.push('/login')
//   // }
//   nprogress.start()
//   next()
//   nprogress.done()
// })

// 导出默认
export default router
