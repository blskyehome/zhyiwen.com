<template>
  <div class="hot-sort">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="aindex">首页</el-breadcrumb-item>
      <el-breadcrumb-item>网址管理</el-breadcrumb-item>
      <el-breadcrumb-item>推荐排序</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="table-cont">
        <el-table :data="hotLinkData" style="width: 100%" class="link-table" stripe row-key="id">
        <el-table-column label="序号" width="50" align="center">
          <template slot-scope="scope">
            <span>{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="图标" width="120" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.image" alt="" class="link-icon" />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="名称" width="150" align="center">
        </el-table-column>
        <el-table-column
          prop="categoryName"
          label="类别"
          width="120"
          align="center"
        >
        </el-table-column>
        <el-table-column label="网址" header-align="center">
          <template slot-scope="scope">
            <a :href="scope.row.url" target="_blank" class="link-url">{{
              scope.row.url
            }}</a>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
    import Sortable from 'sortablejs'
export default {
  name: "hotSort",
  data() {
    return {
      totalCount: 1,
      dataPage: 0,
      linkData: [],
      hotLinkData: []
    };
  },
    comments:{
      Sortable
    },
    mounted() {
      this.rowDrop()
    },
    methods: {
    //   初始化数据
    onLoadData() {
      let self = this;
      self
        .axios({
          method: "get",
          url: "http://zhyiwen.com:9003/link?page=1"
        })
        .then(response => {
          self.totalCount = response.data.result.total;
          self.dataPage = Math.ceil(self.totalCount / 10);
          console.log("page:" + self.dataPage);
          for (var i = 1; i <= self.dataPage; i++) {
            self
              .axios({
                method: "get",
                url: "http://zhyiwen.com:9003/link?page=" + i
              })
              .then(linkData => {
                self.linkData = self.linkData.concat(
                  linkData.data.result.records
                );
                self.hotLinkData = self.linkData.filter(function(e) {
                  console.log(e);
                  return e.isHot == 1;
                });
              })
              .catch(function(error) {
                console.log(error);
              });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
      // 行拖拽
      rowDrop () {
          const tbody = document.querySelector('.el-table__body-wrapper tbody')
          const _this = this
          Sortable.create(tbody, {
              onEnd ({ newIndex, oldIndex }) {
                  const currRow = _this.hotLinkData.splice(oldIndex, 1)[0]
                  _this.hotLinkData.splice(newIndex, 0, currRow)
              }
          })
      },
  },
  created: function() {
    let self = this;
    self.onLoadData();
  }
};
</script>

<style lang="scss" scoped>
    .link-table {
    .link-icon {
        width: 16px;
        height: 16px;
        vertical-align: middle;
        border: 1px solid #ebeef5;
        border-radius: 4px;
    }
    .fa-thumbs-up {
        color: #5ddcb6;
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
        cursor: pointer;
    &:hover {
         text-decoration: underline;
     }
    }
    }
</style>