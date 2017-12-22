'use strict'
// Template version: 1.2.7
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      // 只有以 /api 开头的接口才走代理，其它都不管
      // 这里就表示当你请求以 /api 开头的路径的时候就会代理到 http://api.botue.com
      // /api/login  http://api.botue.com/api/login
      // /api/login  http://api.botue.com/login
      "/api": {
        target: "http://api.botue.com",
        // needed for virtual hosted sites
        // origin 请求对方服务器，会在请求头中有一个字段：origin: 告诉对象服务器我从哪来的
        // 例如你请求百度：baidu.com
        // 默认代理请求 http://api.botue.com 的时候，origin 是 127.0.0.1:8080
        // 我们的代理服务器在代理请求 http://api.botue.com 的时候，会带上我们客户端的 origin
        // 所以我们加入下面这个选项，changeOrigin: true, 告诉对象服务器我不是代理过来的，我是直接过来的
        // 因为对方的代理服务器会根据这个 origin 做判断做虚拟主机分发
        // 关于子级域名
        // baidu.com
        // www.baidu.com a 记录 顶级域名
        // news.baidu.com 子级
        // nodejs.circle.ink
        // vuejs.circle.ink
        // webpack.circle.ink
        // 多个域名对应到了一台服务器
        // 一台服务器提供了多个网站
        // 一台服务器跑了好几台网站服务器，
        // 一般这种服务器上会安装一个反向代理服务器
        changeOrigin: true,  // 代理的时候不要使用 127.0.0.1:8080 ，使用 target 目标，这样对方服务器才能认识
        pathRewrite: {"^/api" : ""} // 路径重写，把路径中的 /api 去除
      }
    }, // vue 作者希望你把代理配置搞到这里

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false,
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
