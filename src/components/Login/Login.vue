<template>
<div class="login">
  <div class="login-wrap">
    <div class="avatar">
      <img src="./monkey.png" class="img-circle" alt="">
    </div>
    <form @submit.prevent="handleLogin" class="col-md-offset-1 col-md-10">
      <div class="input-group input-group-lg">
        <span class="input-group-addon">
                      <i class="fa fa-user"></i>
                  </span>
        <input v-model="formData.username" class="form-control" placeholder="用户名" required>
      </div>
      <div class="input-group input-group-lg">
        <span class="input-group-addon">
                      <i class="fa fa-key"></i>
                  </span>
        <input type="password" v-model="formData.password" class="form-control" placeholder="密码" required>
      </div>
      <button type="submit" class="btn btn-lg btn-primary btn-block">登 录</button>
    </form>
  </div>
</div>
</template>

<script>
import axios from 'axios'

export default {
  created () {
  },
  data () {
    return {
      formData: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    handleLogin () {
      axios.post('http://api.circle.ink/v1/auth', this.formData).then(res => {
        const status = res.status
        if (status === 201) {
          // 把 token 写到本地存储中存储起来
          // 然后在路由导航的钩子中把 token 拿出来进行校验
          // 把 token 等相关信息记录到本地存储
          window.localStorage.setItem('bxg-token', JSON.stringify(res.data))

          // 登陆成功，拿到查询字符串中的重定向路径跳转过去
          this.$router.push(this.$route.query.redirect || '/')
        }
      })
    }
    // handleLogin () {
    //   // 由于我们对 http://api.botue.com 配置了代理
    //   // 我们把 /api 开头的请求路径都代理到了 http://api.botue.com
    //   // 所以我们在自己的网站中如果需要请求 http://api.botue.com 请求使用 /api/xxx 的方式
    //   // http://api.botue.com/login /api/login
    //   // http://api.botue.com/teacher/add /api/teacher/add
    //   // axios.post('/api/login', this.formData)
    //   //   .then(res => {
    //   //     console.log(res)
    //   //   })
    //   //   .catch(err => {
    //   //     console.log('响应结果有错误', err)
    //   //   })

    //   // axios 默认会把对象转成 json 格式字符串然后发送给服务器
    //   // 由于对方服务器不支持接收 json 格式数据，所以我们这里提交 x-www-form-urlencoded 格式的数据
    //   var params = new URLSearchParams();
    //   params.append('tc_name', this.formData.tc_name);
    //   params.append('tc_pass', this.formData.tc_pass);
    //   axios.post('/api/login', params).then(res => {
    //     console.log(res)
    //   })
    // }
  }
}
</script>

<style>
</style>
