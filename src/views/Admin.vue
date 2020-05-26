<template>
  <el-container class="admin">
    <el-header>
      <div class="admin-logo">
        <i
          class="el-icon-eleme"
          style="font-size: 28px; vertical-align: sub;"
        ></i>
        管理后台
      </div>
    </el-header>
    <el-container class="admin-main">
      <el-aside width="auto">
        <div class="toggle-button" @click="toggleMenu">
          <i class="fa fa-align-left toggle-button"></i>
        </div>

        <el-menu
          router
          default-active="1-4-1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
        >
          <el-menu-item index="aindex" select>
            <i class="fa fa-dashboard"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu index="alink">
            <template slot="title">
              <i class="fa fa-link"></i>
              <span slot="title">网址管理</span>
            </template>
            <el-menu-item index="alinklist">网址列表</el-menu-item>
            <el-menu-item index="ahotsort">推荐排序</el-menu-item>
          </el-submenu>
          <el-menu-item index="class">
            <i class="fa fa-male"></i>
            <span slot="title">类别管理</span>
          </el-menu-item>
          <el-menu-item index="self" disabled>
            <i class="fa fa-male"></i>
            <span slot="title">个人中心</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    toggleMenu() {
      this.isCollapse = !this.isCollapse;
    }
  }
};
</script>

<style lang="scss" scoped>
.admin {
  height: 100%;
  .admin-main {
    height: calc(100% - 60px);
  }
}
.el-header {
  background: #b5e3cd;
  .admin-logo {
    float: left;
    line-height: 60px;
    //   margin-left: 20px;
    color: #fff;
    font-size: 16px;
  }
}
.el-aside {
  height: 100%;
  background: transparent;
  .toggle-button {
    position: absolute;
    top: 11px;
    left: 100px;
    font-size: 16px;
    color: #fff;
    cursor: pointer;
  }
  .el-menu {
    min-height: 100%;
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu-item,
.el-submenu {
  .fa {
    margin-right: 5px;
    width: 24px;
    text-align: center;
    font-size: 18px;
    vertical-align: middle;
  }
}
.el-main {
  background-color: #fdfdfd;
}
</style>
