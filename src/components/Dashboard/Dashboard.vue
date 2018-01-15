<template>
  <div class="body teacher-profile">
    <div class="profile">
      <div class="row survey">
        <div class="col-md-3">
          <div class="cell money">
            <i class="fa fa-money"></i>
            <span>我的收入</span>
            <h5>￥11.11</h5>
          </div>
        </div>
        <div class="col-md-3">
          <div class="cell th">
            <i class="fa fa-th"></i>
            <span>课程数量</span>
            <h5>12</h5>
          </div>
        </div>
        <div class="col-md-3">
          <div class="cell user">
            <i class="fa fa-user"></i>
            <span>用户数量</span>
            <h5>236</h5>
          </div>
        </div>
        <div class="col-md-3">
          <div class="cell eye">
            <i class="fa fa-eye"></i>
            <span>浏览量</span>
            <h5>22435</h5>
          </div>
        </div>
      </div>
      <div class="chart">
        <div id="main" style="width: 600px;height:400px;"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  // async created () {
  //   const res = await this.$http.get('/courses')
  //   console.log(res)
  // },
  created() {
    this.$http.get('/courses', {
      res500Message: '服务器忙',
      // res401Message: '我自己定制的 401 message',
      res403Message: '我自己定制的 403 message',
      redirect404: true
    }).then(res => {
      console.log(res.data)
    })
    // 非 2xx 的都会进入 catch 方法
    // this.$http.get('/courses').then(res => {
    //   console.log(res)
    //   // JSON.parse('dsabdbjkas')
    //   // then 中普通代码的出错也会进入 catch
    // }).catch(err => {
    //   console.log('出错了')
    //   // 500
    //   // 401
    //   // 403
    //   // 404
    //   // catch 中的错误不一定是 http 状态码错误，还可能是 then 方法中的程序错误
    //   const status = err.response && err.response.status
    //   switch (status) {
    //     case 500:
    //       window.alert('服务器出错了，请稍后重试！')
    //       break
    //     case 403:
    //       window.alert('您没有权限操作该资源！')
    //       break
    //     case 404:
    //       window.alert('该资源已不存在！')
    //       break
    //     case 401:
    //       window.alert('未授权，请去登陆获取授权')
    //       break
    //     default:
    //       break
    //   }
    // })
  },
  data() {
    return {}
  }
}

</script>
<style>


</style>
