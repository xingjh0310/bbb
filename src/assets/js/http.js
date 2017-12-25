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

// 封装 Vue 插件参考文档：https://cn.vuejs.org/v2/guide/plugins.html
// axios 参考文档：https://github.com/axios/axios
// 基于 axios 复制了一个
// 复制的 axios 不会影响 axios
// 接下来我们请求 bxg-api 的时候都去使用这个 axios 实例来发请求
const bxgAxios = axios.create({
  baseURL: 'http://api.circle.ink/v1/',
  timeout: 1000 * 60, // 请求超时时间，当超过 1000 毫秒没有响应就触发超时钩子
  // X-Access-Token
  // 服务器要求必须把 token 放到一个叫做 X-Access-Token 的请求头中
  headers: {'X-Access-Token': auth.getToken()}
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
  return Promise.reject(error);
});

// 当你使用 bxgAxios 发起的请求收到响应的时候会先进入响应拦截器
// 执行完拦截器的代码之后才真的发起请求
bxgAxios.interceptors.response.use(function (response) {
  // Do something with response data
  // console.log(response)
  nprogress.done()
  return response;
}, function (error) { // 如果响应出错会先进入这个 function 然后再调用你的 catch 方法
  // 登陆失败的时候会进入这里，所以这里也要让 nprogress 停止
  nprogress.done()
  // Do something with response error
  return Promise.reject(error);
});

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
