<template>
<!-- 讲师列表 -->
<div class="body teacher-list">
  <!-- 面包屑 -->
  <ol class="breadcrumb">
    <li><a href="javascript:;">讲师管理</a></li>
    <li class="active">讲师列表</li>
  </ol>
  <div class="page-title">
    <router-link
      class="btn btn-success btn-sm pull-right"
      to="/teachers/new">添加讲师</router-link>
  </div>
  <div class="panel panel-default">
    <div class="panel-body">
      <form action="" class="form-inline">
        <div class="input-group">
          <input type="text" class="form-control input-sm">
          <span class="input-group-btn">
                                  <button class="btn btn-success btn-sm">搜索</button>
                              </span>
        </div>
      </form>
    </div>
    <table class="table table-striped table-bordered table-hover" v-loading="loading">
      <thead>
        <tr>
          <th>编号</th>
          <th>姓名</th>
          <th>昵称</th>
          <th>性别</th>
          <th>手机号码</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in teacherList">
          <td>{{ index + 1 }}</td>
          <td>{{ item.real_name }}</td>
          <td>{{ item.nickname }}</td>
          <td>{{ item.gender === 1 ? '女' : '男' }}</td>
          <td>{{ item.cellphone }}</td>
          <td>
            <a
              href="#"
              class="btn btn-info btn-xs"
              @click.prevent="showTeacherDetail(item._id)">查 看</a>
            <!--
              导航到一个命名路由
              Vue 推荐给所有的路由起名字，这是一个好习惯
              -->
            <router-link class="btn btn-info btn-xs" :to="{
              name: 'teacher-edit',
              params: {
                teacherId: item._id
              }
            }">编辑</router-link>
            <a href="javascript::" class="btn btn-warning btn-xs">注 销</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <el-pagination
      background
      @current-change="handleCurrentChange"
      :page-size="2"
      layout="prev, pager, next"
      :total="totalCount">
    </el-pagination>
  <el-dialog title="讲师信息" :visible.sync="dialogTableVisible">
    <table class="table table-bordered table-condensed">
      <tbody>
        <tr>
          <th>姓名:</th>
          <td>{{ teacher.real_name }}</td>
          <th>职位:</th>
          <td colspan="3">讲师</td>
          <td rowspan="4" width="128">
            <div class="avatar">
              <!-- <img src="./images/default.png" alt=""> -->
            </div>
          </td>
        </tr>
        <tr>
          <th>花名:</th>
          <td>麻衣长老</td>
          <th>出生日期:</th>
          <td colspan="3">2015-11-13</td>
        </tr>
        <tr>
          <th>性别:</th>
          <td>男</td>
          <th>出生日期:</th>
          <td colspan="3">1985-05-25</td>
        </tr>
        <tr>
          <th>手机号码:</th>
          <td colspan="2">13051524959</td>
          <th>邮箱:</th>
          <td colspan="2">zhaoyuchuan@itcast.cn</td>
        </tr>
        <tr>
          <th>籍贯:</th>
          <td colspan="6">河北省 保定市 曲阳县</td>
        </tr>
        <tr>
          <td colspan="7">
            <div class="introduce">
              <p>豫章故郡，洪都新府。星分翼轸，地接衡庐。襟三江而带五湖，控蛮荆而引瓯越。物华天宝，龙光射牛斗之墟；人杰地灵，徐孺下陈蕃之榻。雄州雾列，俊采星驰。台隍枕夷夏之交，宾主尽东南之美。都督阎公之雅望，棨戟遥临；宇文新州之懿范，襜帷暂驻。十旬休假，胜友如云；千里逢迎，高朋满座。腾蛟起凤，孟学士之词宗；紫电青霜，王将军之武库。家君作宰，路出名区；童子何知，躬逢胜饯。</p>
              <p>时维九月，序属三秋。潦水尽而寒潭清，烟光凝而暮山紫。俨骖騑于上路，访风景于崇阿。临帝子之长洲，得仙人之旧馆。层峦耸翠，上出重霄；飞阁流丹，下临无地。鹤汀凫渚，穷岛屿之萦回；桂殿兰宫，列冈峦之体势。</p>
              <p>披绣闼，俯雕甍，山原旷其盈视，川泽纡其骇瞩。闾阎扑地，钟鸣鼎食之家；舸舰迷津，青雀黄龙之舳。云销雨霁，彩彻区明。落霞与孤鹜齐飞，秋水共长天一色。渔舟唱晚，响穷彭蠡之滨，雁阵惊寒，声断衡阳之浦。</p>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </el-dialog>
</div>
</template>
<script>
export default {
  created () {
    this.getTeacherListByPage(2)
  },
  data() {
    return {
      teacherList: [],
      dialogTableVisible: false,
      loading: true,
      teacher: {},
      totalCount: 0
    }
  },
  methods: {
    handleCurrentChange (page) {
      this.loading = true
      this.getTeacherListByPage(page)
    },
    getTeacherListByPage (page = 1) {
      this.$http.get('/teachers', {
        params: {
          _page: page,
          _limit: 2
        }
      }).then(res => {
        this.totalCount = res.headers['x-total-count'] - 0
        this.loading = false
        if (res.status === 200) {
          console.log(res.headers)
          this.teacherList = res.data
        }
      })
    },
    showTeacherDetail (teacherId) {
      // 弹出模态框
      // this.dialogTableVisible = true
      // 拿到点击查看的讲师 id
      // 发起请求获取讲师数据
      // 把讲师数据绑定到查看的模态框中进行展示
      const loading = this.$loading({
        lock: true,
        text: '正在拼命的加载的中。。。',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })

      this.$http.get(`/teachers/${teacherId}`).then(res => {
        this.teacher = res.data
        // 关闭 loading 状态
        loading.close()
        // 弹出模态框
        this.dialogTableVisible = true
      })
    }
  }
}
</script>
<style>
</style>
