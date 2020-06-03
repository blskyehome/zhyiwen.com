/** * @author zhyiwen * @date 2020/6/2 11:15 * @version 1.0 */

<template>
  <div class="category">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="aindex">首页</el-breadcrumb-item>
      <el-breadcrumb-item>类别管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="condition-cont clearfix">
      <el-button
        icon="el-icon-plus"
        type="primary"
        class="link-add"
        @click="categoryShow = true"
        >新增</el-button
      >
    </div>
    <div class="table-cont">
      <el-table
        :data="categoryList"
        style="width: 100%"
        class="link-table"
        stripe
      >
        <el-table-column label="序号" align="center">
          <template slot-scope="scope">
            <span>{{ scope.$index }}</span>
          </template>
        </el-table-column>
        <!--<el-table-column prop="id" label="id" align="center"> </el-table-column>-->
        <el-table-column label="类别图标" align="center">
          <template slot-scope="scope">
            <i :class="'el-icon-'+scope.row.icon"></i>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="类别名称" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
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
    </div>
    <el-dialog title="添加分类" :visible.sync="categoryShow">
      <el-form :model="addForm">
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="addForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类图标" :label-width="formLabelWidth">
          <el-input v-model="addForm.icon" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="categoryShow = false">取 消</el-button>
        <el-button type="primary" @click="addCategory">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  // import _root from '@/common/request.js';
export default {
  name: "Category",
  data() {
    return {
      categoryList: [],
      categoryShow: false,
      formLabelWidth: "80px",
      addForm: {
        name: "",
        icon: "",
      },
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
      self.axios({
        method: "get",
        url: "http://zhyiwen.com:9003/category?page=1",
        headers:{
          'Content-type': 'application/json'
        }
      })
              .then((response) => {
                self.categoryList = response.data.result.records;
              })
              .catch(function(error) {
                console.log(error);
              })
    },
    // 修改分类
    handleEdit(index, row) {
      console.log(index, row);
    },
    // 删除分类
    handleDelete(index, row) {
      console.log(index, row);
    },
    // 新增分类
    addCategory() {
      this.categoryShow = false;
      this.axios({
        method: "post",
        url: "http://zhyiwen.com:9003/category",
        headers:{
          'Content-type': 'application/json'
        },
        data: {
          name: this.addForm.name,
          icon: this.addForm.icon,
        },
      })
        .then(() => {
          this.$message({
            message: "提交成功",
            type: "success",
            offset: 70
          });
          this.clearData();
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
      this.addForm.name="";
      this.addForm.icon="";
    },
  },
};
</script>

<style scoped></style>
