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
        <!--<el-table-column label="序号" align="center">
          <template slot-scope="scope">
            <span>{{ scope.$index }}</span>
          </template>
        </el-table-column>-->
        <el-table-column prop="id" label="id" align="center"> </el-table-column>
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
export default {
  name: "Category",
  data() {
    return {
      categoryList: [
        {
          id: "1",
          icon: "star-off",
          name: "我的收藏",
        },
        {
          id: "2",
          icon: "paperclip",
          name: "常用网站",
        },
        {
          id: "3",
          icon: "collection",
          name: "文档",
        },
        {
          id: "4",
          icon: "brush",
          name: "设计相关",
        },
        {
          id: "5",
          icon: "service",
          name: "学习网址",
        },
        {
          id: "6",
          icon: "connection",
          name: "常用插件",
        },
        {
          id: "7",
          icon: "s-opportunity",
          name: "工具",
        },
      ],
      categoryShow: false,
      formLabelWidth: "80px",
      addForm: {
        name: "",
        icon: "",
      },
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
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
        .then((response) => {
          // this.$message({
          //   message: "提交成功",
          //   type: "success",
          // });
          console.log(response);
        })
        .catch(function(error) {
          // this.$message.error("提交失败");
          console.log(error);
        })
    },
  },
};
</script>

<style scoped></style>
