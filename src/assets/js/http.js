// 1. 请求地址，尼玛太长了
// 2. token，
// 3. axios 使用太频繁了，每次手动引入太痛苦

// 全局配置 axios 的配置项
// axios.defaults.baseURL = 'https://api.circke.ink/v1';

// // 增加公共的请求头，每次使用 axios 发请求都会自动带上这个请求头
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

import axios from 'axios'
import * as auth from './auth'
import nprogress from 'nprogress'

// 由于这里不是在组件中，无法 this.$router
// 所以这里可以通过手动加载 router 的方式来获取 router
import router from '../../router'

// 在这里利用 axios 的请求响应拦截器配置了一个动态的请求响应加载进度条
// 这里只是定制了动态进度条
// 还可以定制统一处理错误码
//    401 没有授权
//    403 已授权，但是没有操作权限
//    404 资源不存在
//    500 服务器错误

// 封装 Vue 插件参考文档：https://cn.vuejs.org/v2/guide/plugins.html
// axios 参考文档：https://github.com/axios/axios
// 基于 axios 复制了一个
// 复制的 axios 不会影响 axios
// 接下来我们请求 bxg-api 的时候都去使用这个 axios 实例来发请求
export const bxgAxios = axios.create({
  baseURL: 'http://api.circle.ink/v1/',
  timeout: 1000 * 60, // 请求超时时间，当超过 6000 毫秒没有响应就触发超时钩子
  // X-Access-Token
  // 服务器要求必须把 token 放到一个叫做 X-Access-Token 的请求头中
  // withCredentials: true,
  // transformRequest: [(data) => JSON.stringify(data.data)],
  headers: { 'X-Access-Token': auth.getToken() }
})

// 请求拦截器
// 当你使用 bxgAxios 发起请求的时候会先进入这个拦截器
// 执行完拦截器的代码之后才真的发起请求
bxgAxios.interceptors.request.use(function (config) { // 如果请求成功，会先进入这里，然后调用你的 then
  // Do something before request is sent
  if (config.nprogress) {
    nprogress.start()
  }

  return config; // 执行玩自己的自定义逻辑之后，就可以放行通过
}, function (error) { // 如果请求本身错误，会先进入这里
  // Do something with request error
  return Promise.reject(error)
})

// 当你使用 bxgAxios 发起的请求收到响应的时候会先进入响应拦截器
// 执行完拦截器的代码之后才真的发起请求
bxgAxios.interceptors.response.use(function (response) { // 响应没有异常就会地调用这个函数
  // Do something with response data
  // console.log(response)
  nprogress.done()
  return response
}, function (error) { // 只有非 2xx 的状态码错误才会进入这个方法
  // 登陆失败的时候会进入这里，所以这里也要让 nprogress 停止
  nprogress.done()

  const config = error.config

  // 现在所有使用 axios 发起请求的代码一旦出错就会进入这里，进行统一的异常处理
  // 注意：这里的异常不是普通的程序错误，一定是 HTTP 状态码错误
  const status = error.response && error.response.status

  switch (status) {
    case 500:
      window.alert(config.res500Message || '服务器异常')
      break
    case 403:
      window.alert(config.res403Message || '没有权限')
      break
    case 404:
      // 404 只有可以选择两种方式
      // 方式一：跳转到一个 404 页面
      // 方式二：弹框：资源不存在
      // 默认弹框：资源不存在
      if (config.redirect404) {
        // 可以选择跳转到 404
        router.push('/not_found')
      } else {
        window.alert(config.res404Message || '不存在')
      }
      break
    case 401:
      window.alert(config.res401Message || '未授权')
      break
    default:
      break
  }

  // Do something with response error
  return Promise.reject(error)
})

// 请求响应拦截器

// 接下来把 axios 配置为 Vue 的一个插件
// 就像 this.$router 代理了 router 实例一样
// Vue.use(router) // 这句话的作用就是在为 Vue 扩展插件
// this.$axios
// 组件实例代理了 data 中的数据
// data 中的数据是不是支持 this.foo this.name 来访问？
// 不要起 this.普通的名字 ，因为是为了防止和 data、methods 等中的成员冲突

// 1. 定义插件
// 2. 导入插件 Vue.use(MyPlugin)
export default {
  // 只要你 Vue.use(插件对象) Vue 就会自动调用 install 方法把 Vue 传进来
  install: function (Vue, options) {
    // 然后在入口实例中通过 Vue.use(插件对象) 你就会发现在组件实例中多了一个对象：$axios
    // 这里就是把成员直接添加到了 Vue 的原型对象中
    // 所有 Vue 的所有实例就都可以访问原型对象中的成员了
    Vue.prototype.$http = bxgAxios
  }
}

// 现在这个 instance 具有 axios 的所有行为

// Instance methods

// The available instance methods are listed below. The specified config will be merged with the instance config.

// axios#request(config)

// axios#get(url[, config])

// axios#delete(url[, config])

// axios#head(url[, config])

// axios#options(url[, config])

// axios#post(url[, data[, config]])

// axios#put(url[, data[, config]])

// axios#patch(url[, data[, config]])
