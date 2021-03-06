import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App'
import router from './router'
import http from './assets/js/http'

// 0. npm i bootstrap font-awesome
// 1. 在组件系统的启动入口载入 boostrap
// 2. 把模板中的 less 放到 assets/less
// 3. npm i less-loader less
// 4. 载入 assets/less/index.less
// 5. 把模板中的 uploads 中的图片放到 assets/img 中
// 6. 然后把 index.less 中的外链引用改为当前相对路径

// 在启动入口这里载入页面需要的样式
// 我们会把通用的样式都在入口这里载入
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'

import 'nprogress/nprogress.css'

import 'element-ui/lib/theme-chalk/index.css'

// 导入第三方样式之后，就可以导入我们自己的公共样式了
// 然后在组件中写组件自己的样式
import './assets/less/index.less'

// 配置使用 Element UI
Vue.use(ElementUI)

// 挂载使用插件使其生效
Vue.use(http)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router, // 不要忘了这一步
  render: h => h(App)
})
