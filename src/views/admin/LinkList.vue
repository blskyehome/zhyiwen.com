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
      ></el-input>
      <el-select v-model="selectCategory" placeholder="请选择类别" class="search-select">
        <el-option :label="item.name" :value="item.id" v-for="item in categoryList" :key="item.id"></el-option>
      </el-select>
      <el-button type="primary">搜索</el-button>
      <el-button icon="el-icon-plus" type="primary" class="link-add" @click="addLinkShow = true">新增</el-button>
    </div>
    <div class="table-cont">
      <el-table :data="linkData" style="width: 100%" class="link-table" stripe>
        <el-table-column label="序号" width="50" align="center">
          <template slot-scope="scope">
            <span>{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="图标" width="120" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.image" alt class="link-icon" v-if="scope.row.image" />
            <img src="../../assets/noImg.png" alt="" class="link-test-icon" v-else>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="名称" width="150" align="center"></el-table-column>
        <el-table-column prop="categoryName" label="类别" width="120" align="center"></el-table-column>
        <el-table-column label="网址" header-align="center">
          <template slot-scope="scope">
            <a :href="scope.row.url" target="_blank" class="link-url">
              {{
              scope.row.url
              }}
            </a>
          </template>
        </el-table-column>
        <el-table-column label="推荐" width="50" align="center">
          <template slot-scope="scope">
            <i
              class="link-hot fa"
              :class="scope.row.isHot === 1 ? 'fa-thumbs-up' : 'fa-level-up'"
              @click="toggleHot(scope.$index, scope.row)"
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
        :page-size="PageSize"
        layout="total, prev, pager, next, jumper"
        :total="totalCount"
      ></el-pagination>
    </div>
    <el-dialog title="添加网址" :visible.sync="addLinkShow">
      <el-form :model="linkForm">
        <el-form-item label="网址名称" :label-width="formLabelWidth">
          <el-input v-model="linkForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="网址图片" :label-width="formLabelWidth" class="img-show">
          <el-input v-model="linkForm.image" autocomplete="off">
            <el-button type="primary" slot="append">
              上传
              <i class="el-icon-upload el-icon--right"></i>
            </el-button>
          </el-input>
        </el-form-item>
        <el-form-item label="所属类别" :label-width="formLabelWidth">
          <el-select v-model="linkForm.categoryId" placeholder="请选择类别">
            <el-option
              :label="item.name"
              :value="item.id"
              v-for="item in categoryList"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="网址" :label-width="formLabelWidth">
          <el-input v-model="linkForm.url" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否推荐" :label-width="formLabelWidth">
          <el-switch v-model="linkForm.hotValue"></el-switch>
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
    <el-dialog title="修改网址" :visible.sync="editLinkShow">
      <el-form :model="linkForm">
        <el-form-item label="网址名称" :label-width="formLabelWidth">
          <el-input v-model="linkForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="网址图片" :label-width="formLabelWidth">
          <el-input v-model="linkForm.image" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属类别" :label-width="formLabelWidth">
          <el-select v-model="linkForm.categoryId" placeholder="请选择类别">
            <el-option
              :label="item.name"
              :value="item.id"
              v-for="item in categoryList"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="网址" :label-width="formLabelWidth">
          <el-input v-model="linkForm.url" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否推荐" :label-width="formLabelWidth">
          <el-switch v-model="linkForm.hotValue"></el-switch>
        </el-form-item>
        <el-form-item label="链接详情" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="linkForm.description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addLink = false">取 消</el-button>
        <el-button type="primary" @click="editLink">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 总数据
      linkData: [],
      categoryList: [],
      search: "",
      addLinkShow: false,
      editLinkShow: false,
      selectCategory: "",
      pushCategory: "",
      linkForm: {
        image: "",
        name: "",
        categoryId: "",
        categoryName: "",
        url: "",
        hotValue: false,
        isHot: 0,
        description: "",
      },
      formLabelWidth: "120px",
      // 默认显示第几页
      currentPage: 1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount: 1,
      // 默认每页显示的条数（可修改）
      PageSize: 10,
    };
  },
  created() {
    let self = this;
    //加载页面初始化数据
    self.getCategory();
    self.onLoadData();
  },
  updated() {
    var self = this;
					self.$nextTick(function(){
            
          })
  },
  methods: {
    // 初始化数据
    getCategory() {
      let self = this;
      this.request.get({
        url:'/category?page=1'
      }).then((response) => {
          self.categoryList = response.data.result.records;
        })
    },
    onLoadData() {
      let self = this;
      self
        .axios({
          method: "get",
          url: "http://zhyiwen.com:9003/link?page=" + self.currentPage,
        })
        .then((response) => {
          self.linkData = response.data.result.records;
          self.totalCount = response.data.result.total;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    toggleHot(index, row) {
      let self = this;
      console.log(index, row);
      self.linkForm = row;
      console.log(self.linkForm);
      self
        .$confirm("是否确定修改推荐?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          if (self.linkForm.isHot === 0) {
            self.linkForm.isHot = 1;
          } else {
            self.linkForm.isHot = 0;
          }
          self
            .axios({
              method: "post",
              url: "http://zhyiwen.com:9003/link",
              headers: {
                "Content-type": "application/json",
              },
              data: {
                id: self.linkForm.id,
                isHot: self.linkForm.isHot,
              },
            })
            .then(() => {
              self.$message({
                message: "修改成功",
                type: "success",
                offset: 70,
              });
              self.clearData();
              self.$router.go(0);
            })
            .catch(function () {
              self.$message({
                message: "修改失败",
                type: "error",
                offset: 70,
              });
            });
        })
        .catch(() => {
          self.$message({
            type: "info",
            message: "已取消操作",
            offset: 70,
          });
        });
    },
    handleEdit(index, row) {
      // console.log(index, row);
      let self = this;
      self.editLinkShow = true;
      self.linkForm = row;
      console.log("1======="+self.linkForm.hotValue);
      if (self.linkForm.isHot === 1) {
        self.linkForm.hotValue = true;
      } else {
        self.linkForm.hotValue === false;
      }
      console.log("2======="+self.linkForm.hotValue);
      self.pushCategory = "";
    },
    handleDelete(index, row) {
      // console.log(index, row);
      // console.log(row.id);
      let self = this;
      self
        .$confirm("此操作将永久删除该分类, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          let ids = row.id;
          self.axios
            .delete("http://zhyiwen.com:9003/link", {
              data: [ids],
            })
            .then(() => {
              self.$message({
                message: "删除成功",
                type: "success",
                offset: 70,
              });
              // this.clearData();
              self.$router.go(0);
            })
            .catch(function () {
              self.$message({
                message: "删除失败",
                type: "error",
                offset: 70,
              });
            });
        })
        .catch(() => {
          self.$message({
            type: "info",
            message: "已取消删除",
            offset: 70,
          });
        });
    },
    // 每页显示的条数
    handleSizeChange(val) {
      // 改变每页显示的条数
      this.PageSize = val;
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.currentPage = 1;
    },
    // 显示第几页
    handleCurrentChange(val) {
      // 改变默认的页数
      this.currentPage = val;
      this.onLoadData();
    },
    // 新增网址
    addLink() {
      let self = this;
      self.addLinkShow = false;
      if (this.linkForm.hotValue === true) {
        this.linkForm.isHot = 1;
      } else {
        this.linkForm.isHot = 0;
      }
      self.pushCategory = self.categoryList.filter(function (e) {
        return e.id === self.linkForm.categoryId;
      });
      // console.log("取出来的分类是什么"+JSON.stringify(self.pushCategory));
      self
        .axios({
          method: "post",
          url: "http://zhyiwen.com:9003/link",
          headers: {
            "Content-type": "application/json",
          },
          data: {
            image: self.linkForm.image,
            name: self.linkForm.name,
            categoryId: self.linkForm.categoryId,
            categoryName: self.pushCategory[0].name,
            url: self.linkForm.url,
            isHot: self.linkForm.isHot,
            description: self.linkForm.description,
          },
        })
        .then(() => {
          self.$message({
            message: "提交成功",
            type: "success",
            offset: 70,
          });
          self.clearData();
          self.$router.go(0);
        })
        .catch(function () {
          self.$message({
            message: "提交失败",
            type: "error",
            offset: 70,
          });
        });
    },

    // 修改网址
    editLink() {
      this.editLinkShow = false;
      if (this.linkForm.hotValue === true) {
        this.linkForm.isHot = 1;
      } else {
        this.linkForm.isHot = 0;
      }
      let self = this;
      self.pushCategory = self.categoryList.filter(function (e) {
        return e.id === self.linkForm.categoryId;
      });
      console.log("取出来的分类是什么" + JSON.stringify(self.pushCategory));
      this.axios({
        method: "post",
        url: "http://zhyiwen.com:9003/link",
        headers: {
          "Content-type": "application/json",
        },
        data: {
          id: self.linkForm.id,
          image: self.linkForm.image,
          name: self.linkForm.name,
          categoryId: self.linkForm.categoryId,
          categoryName: self.pushCategory[0].name,
          url: self.linkForm.url,
          isHot: self.linkForm.isHot,
          description: self.linkForm.description,
        },
      })
        .then(() => {
          this.$message({
            message: "修改成功",
            type: "success",
            offset: 70,
          });
          this.clearData();
          this.$router.go(0);
        })
        .catch(function () {
          this.$message({
            message: "修改失败",
            type: "error",
            offset: 70,
          });
        });
    },
    // 清除数据
    clearData() {
      this.linkForm = {
        image: "",
        name: "",
        categoryId: "",
        categoryName: "",
        url: "",
        isHot: 0,
        hotValue: false,
        description: "",
      };
    },
  },
  watch: {},
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
  .link-test-icon {
    width: 18px;
    height: 18px;
    vertical-align: middle;
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
.img-show {
  .el-input-group__append {
    .el-button--primary {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      background: #5ddcb6;
      color: #fff;
      border-color: #5ddcb6;
    }
  }
}
</style>
