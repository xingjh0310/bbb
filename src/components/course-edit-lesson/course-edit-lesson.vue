<template>
<div class="body course-add">
  <!-- 面包屑 -->
  <ol class="breadcrumb">
    <li><a href="javascript:;">课程管理</a></li>
    <li class="active">课程添加</li>
  </ol>
  <div class="steps">
    <!-- 摘要 -->
    <div class="brief">
      <div class="thumb">
        <!-- <img src="./uploads/course_1.jpg" alt=""> -->
      </div>
      <dl class="info">
        <dt>Git 指南</dt>
        <dd>讲师：李鹏周</dd>
        <dd>课时：32</dd>
      </dl>
    </div>
    <!-- 步聚 -->
    <ul class="forwards list-unstyled">
      <li>
        <a href="./course_add_step1.html" class="done">
                          <b class="fa fa-check"></b>
                          基本信息
                          </a>
      </li>
      <li>
        <a href="./course_add_step2.html" class="done">
                          <b class="fa fa-check"></b>
                          课程图片
                          </a>
      </li>
      <li>
        <a href="./course_add_step3.html" class="active">
                          <b>3</b>
                          课时管理
                          </a>
      </li>
    </ul>
    <!-- 课时管理 -->
    <div class="content">
      <!-- 标题 -->
      <div class="title">
        <h5>课时管理 <small>LESSON MANAGE</small></h5>
        <a src="javascript:;" data-toggle="modal" data-target="#lesson" class="btn btn-success btn-sm pull-right">
                              <i class="fa fa-plus"></i>
                              课时
                          </a>
      </div>
      <div class="lessons">
        <ul class="list-unstyled">
          <li>
            <i class="fa fa-file-video-o"></i>
            <span class="order">课时：1</span>
            <span class="name">Git工作原理</span>
            <span class="duration">12:06</span>
            <!-- 操作 -->
            <div class="action pull-right">
              <a href="javascript:;" class="btn btn-info btn-xs" data-toggle="modal" data-target="#lesson">编辑</a>
              <a href="javascript:;" class="btn btn-info btn-xs">预览</a>
              <a href="javascript:;" class="btn btn-danger btn-xs">删除</a>
            </div>
          </li>
          <li>
            <i class="fa fa-file-video-o"></i>
            <span class="order">课时：2</span>
            <span class="name">Git版本管理</span>
            <span class="duration">16:07</span>
            <!-- 操作 -->
            <div class="action pull-right">
              <a href="javascript:;" class="btn btn-info btn-xs" data-toggle="modal" data-target="#lesson">编辑</a>
              <a href="javascript:;" class="btn btn-info btn-xs">预览</a>
              <a href="javascript:;" class="btn btn-danger btn-xs">删除</a>
            </div>
          </li>
          <li>
            <i class="fa fa-file-video-o"></i>
            <span class="order">课时：3</span>
            <span class="name">Git协同开发</span>
            <span class="duration">10:02</span>
            <!-- 操作 -->
            <div class="action pull-right">
              <a href="javascript:;" class="btn btn-info btn-xs" data-toggle="modal" data-target="#lesson">编辑</a>
              <a href="javascript:;" class="btn btn-info btn-xs">预览</a>
              <a href="javascript:;" class="btn btn-danger btn-xs">删除</a>
            </div>
          </li>
          <li>
            <i class="fa fa-file-video-o"></i>
            <span class="order">课时：4</span>
            <span class="name">Git共享仓库</span>
            <span class="duration">14:28</span>
            <!-- 操作 -->
            <div class="action pull-right">
              <a href="javascript:;" class="btn btn-info btn-xs" data-toggle="modal" data-target="#lesson">编辑</a>
              <a href="javascript:;" class="btn btn-info btn-xs">预览</a>
              <a href="javascript:;" class="btn btn-danger btn-xs">删除</a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style>
</style>
