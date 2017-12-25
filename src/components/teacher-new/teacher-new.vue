<template>
<div class="body teacher">
  <!-- 面包屑 -->
  <ol class="breadcrumb">
    <li><a href="javascript:;">讲师管理</a></li>
    <li class="active">讲师添加</li>
  </ol>
  <div class="teacher-add">
    <form
      class="form-horizontal col-md-offset-2"
      @submit.prevent="handleTeacherAdd">
      <div class="form-group">
        <label for="" class="col-md-3 control-label">用户名</label>
        <div class="col-md-4">
          <input
            required
            type="text"
            class="form-control input-sm"
            placeholder="用户名"
            v-model="teacher.username">
        </div>
      </div>
      <div class="form-group">
        <label for="" class="col-md-3 control-label">姓名</label>
        <div class="col-md-4">
          <input
            required
            type="text"
            class="form-control input-sm"
            placeholder="讲师名称"
            v-model="teacher.real_name">
        </div>
      </div>
      <div class="form-group">
        <label for="" class="col-md-3 control-label">密码</label>
        <div class="col-md-4">
          <input required type="password" class="form-control input-sm" v-model="teacher.password">
        </div>
      </div>
      <div class="form-group">
        <label for="" class="col-md-3 control-label">入职时间</label>
        <div class="col-md-4">
          <input required type="date" class="form-control input-sm" v-model="teacher.join_date">
        </div>
      </div>
      <div class="form-group">
        <label for="" class="col-md-3 control-label">类型</label>
        <div class="col-md-2">
          <select name="" class="form-control input-sm" v-model.number="teacher.type">
            <option value="1">讲师</option>
            <option value="0">管理员</option>
          </select>
        </div>
      </div>
      <div class="form-group">
        <label for="" class="col-md-3 control-label">性别</label>
        <div class="col-md-4">
          <label class="radio-inline">
            <input type="radio" value="0" name="gender" v-model.number="teacher.gender"> 男
          </label>
          <label class="radio-inline">
            <input type="radio" value="1" name="gender" v-model.number="teacher.gender"> 女
          </label>
        </div>
      </div>
      <div class="form-group">
        <div class="col-md-7">
          <input type="submit" class="btn btn-success btn-sm pull-right" value="添加">
        </div>
      </div>
    </form>
  </div>
</div>
</template>

<script>
// username: 'admin', 用户名
// password: '14e1b600b1fd579f47433b88e8d85291', 密码
// real_name: '管理员', 真实姓名
// gender: 0, 性别 0 男 1 女
// join_date: '2017-12-24', 加入日期
// type: 0 类型，0 管理员、1 普通用户
export default {
  data () {
    return {
      teacher: {
        username: '',
        password: '',
        real_name: '',
        gender: 1,
        join_date: '',
        type: 1
      }
    }
  },
  methods: {
    handleTeacherAdd () {
      console.log(this.teacher)
      this.$http.post('teachers', this.teacher, {
        nprogress: true
      }).then(res => {
        if (res.status === 201) {
          this.$router.push('/teachers')
        }
      })
    }
  }
}
</script>

<style>
</style>
