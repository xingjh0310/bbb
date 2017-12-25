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
      @submit.prevent="handleTeacherEdit">
      <div class="form-group">
        <label for="" class="col-md-3 control-label">用户名</label>
        <div class="col-md-4">
          <input
            required
            type="text"
            class="form-control input-sm"
            placeholder="用户名"
            disabled
            :value="teacher.username">
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
          <input type="submit" class="btn btn-success btn-sm pull-right" value="保存修改">
        </div>
      </div>
    </form>
  </div>
</div>
</template>

<script>
import moment from 'moment'
import {bxgAxios} from 'js/http'

export default {
  created () {
  },
  // beforeRouteEnter 适合在路由导航前获取数据
  // 这个钩子在全局路由钩子之后被执行
  // 在路由导航前触发这个钩子
  // 我们在全局钩子大门之后还为这个视图设置了一个小门
  // 先拿到数据,然后在放行
  // to 表示去哪儿
  // from 表示从哪个路由来的
  // next 是放行的方法
  // 注意：不！能！获取 Vue 实例
  beforeRouteEnter (to, from, next) {
    // 在路由导航前就先获取数据
    // 数据获取不到，不允许渲染该视图
    getTeacherById(to.params.teacherId, (teacher) => {
      // next 接收一个函数
      // 函数中的参数 vm 就是当前组件 Vue 实例
      // setData 也是用于为实例添加或修改数据
      // next(vm => vm.setData(err, post))
      next(vm => {
        // vm.foo = 'bar'
        // console.log(vm)
        vm.teacher = teacher
      })
    })
  },
  data () {
    return {
      teacher: {
        username: '',
        real_name: '',
        gender: 1,
        join_date: '',
        type: 1
      }
    }
  },
  methods: {
    handleTeacherEdit () {
      const teacher = this.teacher
      this.$http.put(`/teachers/${teacher._id}`, teacher, {
        nprogress: true
      }).then(res => {
        if (res.status === 201) {
          this.$router.push('/teachers')
        }
      })
    }
  }
}

function getTeacherById (teacherId, callback) {
  bxgAxios.get(`/teachers/${teacherId}`).then(res => {
    // 处理加入日期的格式
    const joinDate = res.data.join_date
    res.data.join_date = moment.utc(joinDate).format('YYYY-MM-DD')

    // 调用回调函数，传递异步函数的结果
    callback(res.data)
  })
}
</script>

<style>
</style>
