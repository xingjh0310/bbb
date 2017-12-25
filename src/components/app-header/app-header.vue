<template>
<!-- 头部 -->
<div class="header">
  <nav class="navbar navbar-custom">
    <div class="navbar-header">
      <a href="javascript:;" class="navbar-brand">
                  <i class="fa fa-navicon"></i>
              </a>
    </div>
    <ul class="nav navbar-nav navbar-right">
      <li>
        <a href="javascript:;">
                      <i class="fa fa-bell"></i>
                      <span class="badge">8</span>
                  </a>
      </li>
      <li>
        <a href="#/settings/profile">
                      <i class="fa fa-user"></i>
                      个人中心
                  </a>
      </li>
      <li>
        <a href="javascript:;" @click="handleLogout">
                      <i class="fa fa-sign-out"></i>
                      退出
                  </a>
      </li>
      <li>
        <a href="javascript:;">
                      <i class="fa fa-tasks"></i>
                  </a>
      </li>
    </ul>
  </nav>
</div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    // 处理用户退出
    handleLogout () {
      // 1. 删除本地 token
      // 2. 请求服务器，告诉服务器用户退出了
      window.localStorage.removeItem('bxg-token')

      // 服务器得知道谁要退出
      this.$http.delete('/auth', {
        nprogress: true
      }).then(res => {
        if (res.status === 204) {
          this.$router.push('/login')
        }
      })
    }
  }
}
</script>

<style>
</style>
