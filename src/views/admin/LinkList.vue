<template>
  <div class="admin-link-list">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="aindex">首页</el-breadcrumb-item>
      <el-breadcrumb-item>网址管理</el-breadcrumb-item>
      <el-breadcrumb-item>网址列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="condition-cont clearfix">
      <el-input
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        v-model="search"
        class="search-input"
      >
      </el-input>
      <el-select
        v-model="selectCategory"
        placeholder="请选择类别"
        class="search-select"
      >
        <el-option :label="item.name" :value="item.id" v-for="item in categoryList" :key="item.id"></el-option>
      </el-select>
      <!-- <el-dropdown>
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
      </el-dropdown> -->
      <el-button type="primary">搜索</el-button>
      <el-button
        icon="el-icon-plus"
        type="primary"
        class="link-add"
        @click="addLinkShow = true"
        >新增</el-button
      >
    </div>
    <div class="table-cont">
      <el-table :data="linkData" style="width: 100%" class="link-table" stripe>
        <el-table-column label="序号" width="50" align="center">
          <template slot-scope="scope">
            <span>{{ scope.$index }}</span>
          </template>
        </el-table-column>
        <el-table-column label="图标" width="120" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.image" alt="" class="link-icon" />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="名称" width="120" align="center">
        </el-table-column>
        <el-table-column prop="categoryName" label="类别" width="120" align="center">
        </el-table-column>
        <el-table-column label="网址" header-align="center">
          <template slot-scope="scope">
            <a :href="scope.row.url" target="_blank" class="link-url">{{
              scope.row.url
            }}</a>
          </template>
        </el-table-column>
        <el-table-column label="推荐" width="50" align="center">
          <template slot-scope="scope">
            <i
              class="link-hot fa"
              :class="scope.row.isHot ? 'fa-thumbs-up' : 'fa-level-up'"
              @click="toggleHot(scope.$index)"
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
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="15"
      layout="total, prev, pager, next"
      hide-on-single-page
      :total="200">
    </el-pagination>
    </div>
    <el-dialog title="添加网址" :visible.sync="addLinkShow">
      <el-form :model="linkForm">
        <el-form-item label="网址名称" :label-width="formLabelWidth">
          <el-input v-model="linkForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="网址图片" :label-width="formLabelWidth">
          <el-input v-model="linkForm.image" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属类别" :label-width="formLabelWidth">
          <el-select v-model="linkForm.categoryId" placeholder="请选择类别">
            <el-option :label="item.name" :value="item.id" v-for="item in categoryList" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="网址" :label-width="formLabelWidth">
          <el-input v-model="linkForm.url" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否推荐" :label-width="formLabelWidth">
          <el-switch v-model="linkForm.isHot"></el-switch>
        </el-form-item>
        <el-form-item label="链接详情" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="linkForm.description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addLink = false">取 消</el-button>
        <el-button type="primary" @click="addLink">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      linkData: [],
      categoryList: [],
      search: "",
      addLinkShow: false,
      selectCategory: '',
      linkForm: {
        image: "",
        name: "",
        categoryId: "",
        url: "",
        isHot: false,
        description: ""
      },
      formLabelWidth: "120px",
      currentPage: 1
    };
  },
  mounted() {
    let self = this;
    //加载页面初始化数据
    self.onLoadData();
  },
  methods: {
    // 初始化数据
    onLoadData() {
      let self = this;
      self.axios.all([
        self.axios.get('http://zhyiwen.com:9003/category?page=1'),
        self.axios.get('http://zhyiwen.com:9003/link?page=1')
      ])
         .then(self.axios.spread(function (cateData, linkData) {
           // 上面两个请求都完成后，才执行这个回调方法
           // console.log('category', cateData.data);
           // console.log('link', linkData.data);
           self.categoryList = cateData.data.result.records;
           self.linkData = linkData.data.result.records
         }))
        .catch(function(error) {
          console.log(error);
        })

    },
    toggleHot(val) {
      this.linkData[val].isHot = !this.linkData[val].isHot;
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    // 新增网址
    addLink(){
      this.addLinkShow = false;
      this.axios({
        method: "post",
        url: "http://zhyiwen.com:9003/link",
        headers:{
          'Content-type': 'application/json'
        },
        data: {
          image: this.linkForm.image,
          name: this.linkForm.name,
          categoryId: this.linkForm.categoryId,
          url: this.linkForm.url,
          isHot: this.linkForm.isHot,
          description: this.linkForm.description
        },
      })
        .then(() => {
          this.$message({
            message: "提交成功",
            type: "success",
            offset: 70
          });
          // this.clearData();
          this.$router.go(0)
        })
        .catch(function() {
          this.$message({
            message: "提交失败",
            type: "error",
            offset: 70
          });
        })
    },
    // 清除数据
    clearData(){
      this.linkForm = {
        image: "",
        name: "",
        categoryId: "",
        url: "",
        isHot: false,
        description: ""
      };
    },
  },
  watch:{

  }
};
</script>

<style lang="scss" scoped>
.link-table {
  .link-icon {
    width: 16px;
    height: 16px;
    vertical-align: middle;
    border: 1px solid #EBEEF5;
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
