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
</style>
