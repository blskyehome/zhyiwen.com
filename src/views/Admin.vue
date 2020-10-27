<template>
  <el-container class="admin">
    <el-header class="admin-header">
      <div class="admin-logo">
        <i class="el-icon-eleme" style="font-size: 28px; vertical-align: sub;"></i>
        管理后台
      </div>
      <div class="admin-manage">
        <div class="admin-btn-group">
          <!-- <el-badge :value="11" :max="10" class="item">
            <el-button
              class="admin-head-ico"
              type="primary"
              icon="el-icon-message-solid"
              size="small"
              circle
            ></el-button>
          </el-badge>-->
          <el-button
            class="admin-head-ico"
            type="primary"
            icon="el-icon-s-tools"
            size="small"
            circle
          ></el-button>
        </div>
        <div class="user-img">
          <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          <!-- <el-avatar>译文</el-avatar> -->
          <span class="user-name">抓耗子的猫</span>
        </div>
      </div>
    </el-header>
    <el-container class="admin-main">
      <el-aside width="auto">
        <div class="toggle-button" @click="toggleMenu">
          <i class="fa fa-align-left toggle-button"></i>
        </div>

        <el-menu
          router
          default-active="aindex"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
        >
          <el-menu-item index="aindex">
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
          <el-menu-item index="acategory">
            <i class="fa fa-sitemap"></i>
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
  created() {
    var screenWidth = document.body.clientWidth;
    console.log(screenWidth);
    if (screenWidth < 992) {
      this.isCollapse = true;
    }
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

<style lang="scss">
.admin {
  height: 100%;
  .admin-main {
    height: calc(100% - 60px);
  }
}
.admin-header {
  background: #b5e3cd;
  .admin-logo {
    float: left;
    line-height: 60px;
    //   margin-left: 20px;
    color: #fff;
    font-size: 16px;
  }
  .admin-manage {
    float: right;
    .user-img {
      position: relative;
      float: left;
      margin-left: 10px;
      .el-avatar {
        position: absolute;
        top: 10px;
        left: 0;
      }
      .user-name {
        padding-left: 50px;
        font-size: 14px;
        line-height: 60px;
        color: #fff;
      }
    }
    .admin-btn-group {
      float: left;
      margin-top: 15px;
    }
    .admin-head-ico {
      background: rgba($color: #fff, $alpha: 0.2);
      border: none;
      margin-left: 10px;
    }
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
.el-breadcrumb {
  margin-bottom: 15px;
}
.condition-cont {
  margin-bottom: 20px;
  .search-input {
    width: 200px;
    margin-right: 10px;
  }
  .search-select {
    width: 200px;
    margin-right: 10px;
  }
  .el-dropdown {
    margin-right: 10px;
    .el-button {
      width: 200px;
      text-align: left;
    }
    .el-icon--right {
      float: right;
    }
  }
  .link-add {
    float: right;
  }
}
</style>
