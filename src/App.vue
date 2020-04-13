<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}
#app {
  height: 100%;
}
.table-cont {
  // background: #fff;
  // padding: 20px;
  .el-table {
    border: 1px solid #EBEEF5;
    th,
    td {
      padding: 5px 0;
    }
    th{
      background: #f5f7fa;
      color: #606266;
    }
  }
  .el-pagination{
    margin-top: 30px;
    text-align: center;
    .el-pager li{
      background: transparent;
    }
    .btn-next, .btn-prev{
      background: transparent;
    }
  }
}
.search-box {
  width: 85%;
  margin: 0 auto;
  padding-top: 80px;
  .search-tab {
    margin: 0;
    padding: 0;
    list-style-type: none;
    text-align: center;
    .search-tab-item {
      position: relative;
      cursor: pointer;
      display: inline-block;
      color: #fff;
      padding: 5px 0;
      margin: 0 15px 10px;
      &.active {
        border-bottom: 2px solid #fff;
      }
    }
  }
  .el-input-group__append,
  .el-input-group__prepend {
    background: #fff;
    color: #999;
    border: 0;
  }
  .el-input-group__append {
    border-top-right-radius: 50px;
    border-bottom-right-radius: 50px;
    color: #f9ca05;
    .el-icon-search {
      font-weight: 900;
      font-size: 18px;
    }
  }
  .el-input-group__prepend {
    border-top-left-radius: 50px;
    border-bottom-left-radius: 50px;
    border-right: 1px solid #dcdfe6;
    padding-right: 5px;
  }
  .el-input__inner {
    border: 0;
  }
  .search-logo {
    width: 88px;
    height: 34px;
    display: block;
    background-image: url(assets/tubiao.png);
    background-repeat: no-repeat;
    transition: all 0.3s;
    &.baidu {
      background-position: 0 0;
    }
    &.bing {
      background-position: 0 -40px;
    }
    &.huaban {
      background-position: 0 -80px;
    }
    &.iconfont {
      background-position: 0 -120px;
    }
  }
}
.clearfix::before, .clearfix::after {
    display: table;
    content: "";
}
.clearfix::after {
    clear: both;
}
</style>
