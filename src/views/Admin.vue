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
          default-active="1-4-1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
        >
          <el-menu-item index="1">
            <i class="fa fa-dashboard"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="fa fa-link"></i>
              <span slot="title">网址管理</span>
            </template>
            <el-menu-item index="2-1">网址列表</el-menu-item>
            <el-menu-item index="2-2">添加网址</el-menu-item>
            <el-menu-item index="2-3">修改网址</el-menu-item>
          </el-submenu>
          <el-menu-item index="3" disabled>
            <i class="fa fa-male"></i>
            <span slot="title">个人中心</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <div class="condition-cont">
          <el-input
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            v-model="search"
          >
          </el-input>
          <el-dropdown>
            <el-button>
              类别<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>常用网址</el-dropdown-item>
              <el-dropdown-item>设计网址</el-dropdown-item>
              <el-dropdown-item>前端网址</el-dropdown-item>
              <el-dropdown-item>学习网站</el-dropdown-item>
              <el-dropdown-item>示例网站</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-button type="primary">搜索</el-button>
          <el-button icon="el-icon-plus" type="primary" class="link-add">新增</el-button>
        </div>
        <el-table :data="linkData" style="width: 100%" class="link-table">
          <el-table-column label="序号" width="50" align="center">
            <template slot-scope="scope">
              <span>{{ scope.$index }}</span>
            </template>
          </el-table-column>
          <el-table-column label="图标" width="120" align="center">
            <template slot-scope="scope">
              <img :src="scope.row.img" alt="" class="link-icon" />
            </template>
          </el-table-column>
          <el-table-column prop="name" label="名称" width="120" align="center">
          </el-table-column>
          <el-table-column prop="class" label="类别" width="120" align="center">
          </el-table-column>
          <el-table-column label="网址" header-align="center">
            <template slot-scope="scope">
              <a :href="scope.row.link" target="_blank" class="link-url">{{
                scope.row.link
              }}</a>
            </template>
          </el-table-column>
          <el-table-column label="推荐" width="50" align="center">
            <template slot-scope="scope">
              <i
                class="link-hot fa"
                :class="scope.row.hot ? 'fa-thumbs-up' : 'fa-level-up'"
                @click="toggleHot"
              ></i>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200" align="center">
            <template slot-scope="scope">
              <el-button-group>
                <el-button
                  plain
                  size="mini"
                  type="info"
                  icon="el-icon-edit"
                  @click="handleEdit(scope.$index, scope.row)"
                ></el-button>
                <el-button
                  plain
                  @click="handleDelete(scope.$index, scope.row)"
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                ></el-button>
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,
      linkData: [
        {
          img:
            "https://img.alicdn.com/imgextra/i4/2590951958/TB2eTpYxUR1BeNjy0FmXXb0wVXa_!!2590951958.png",
          name: "百度",
          class: "常用推荐",
          link: "https://www.baidu.com/",
          hot: true,
          desc: "百度一下，你就知道"
        },
        {
          img:
            "https://img.alicdn.com/imgextra/i1/2590951958/O1CN011QKnwrArtSpUuI1_!!2590951958.png",
          name: "12306",
          class: "常用推荐",
          link: "https://www.12306.cn/index/",
          hot: false,
          desc: "中国铁路购票网站"
        },
        {
          img:
            "https://img.alicdn.com/imgextra/i3/2590951958/TB2.D8yhnmWBKNjSZFBXXXxUFXa_!!2590951958.png",
          name: "58同城",
          class: "常用推荐",
          link: "https://www.58.com/",
          hot: true,
          desc: ""
        },
        {
          img:
            "https://img.alicdn.com/imgextra/i2/2590951958/TB2jfVJxQ9WBuNjSspeXXaz5VXa_!!2590951958.png",
          name: "搜狐",
          class: "常用",
          link: "http://www.sohu.com/",
          hot: false,
          desc: "中国加油，武汉加油"
        }
      ],
      search: ""
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
    },
    toggleHot() {
      this.linkData.row.hot = !this.linkData.row.hot;
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  }
};
</script>

<style lang="scss">
#app {
  height: 100%;
}
.admin {
  height: 100%;
  .admin-main {
    height: calc(100% - 60px);
  }
}
.el-header {
  background: #f9ca05;
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
  background-color: #f5f7fa;
}
.link-table {
  .link-icon {
    width: 16px;
    height: 16px;
    vertical-align: middle;
  }
  .fa-thumbs-up {
    color: #67c23a;
  }
  .fa-level-up {
    color: #999;
  }
  .link-url {
    max-width: 300px;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: keep-all;
    white-space: nowrap;
    text-decoration: none;
    color: #0094ff;
    &:hover {
      text-decoration: underline;
    }
  }
}
.condition-cont {
    margin-bottom: 20px;
  .el-input {
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
  .link-add{
      float: right;
  }
}
</style>
