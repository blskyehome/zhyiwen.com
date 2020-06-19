<template>
  <div class="admin-index">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row :gutter="20">
      <el-col :span="16">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>访问次数统计</span>
          </div>
          <div id="option1" style="width:100%; height:250px;"></div>
        </el-card>
      </el-col>
      <el-col :span="8">
       <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>网址分类统计</span>
          </div>
          <div id="option2" style="width:100%; height:250px;"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { Chart } from '@antv/g2';
export default {
  mounted() {
    this.chart1();
    this.chart2()
  },
  methods: {
    chart1() {
      const data = [
        { month: "2:00", city: "昨天", temperature: 18 },
        { month: "2:00", city: "今天", temperature: 10 },
        { month: "4:00", city: "昨天", temperature: 13 },
        { month: "4:00", city: "今天", temperature: 6 },
        { month: "6:00", city: "昨天", temperature: 9 },
        { month: "6:00", city: "今天", temperature: 12 },
        { month: "8:00", city: "昨天", temperature: 7 },
        { month: "8:00", city: "今天", temperature: 9 },
        { month: "10:00", city: "昨天", temperature: 6 },
        { month: "10:00", city: "今天", temperature: 9 },
        { month: "12:00", city: "昨天", temperature: 9 },
        { month: "12:00", city: "今天", temperature: 14 },
        { month: "14:00", city: "昨天", temperature: 14 },
        { month: "14:00", city: "今天", temperature: 25 },
        { month: "16:00", city: "昨天", temperature: 18 },
        // { month: "16:00", city: "今天", temperature: 11 },
        { month: "18:00", city: "昨天", temperature: 21 },
        // { month: "18:00", city: "今天", temperature: 15 },
        { month: "20:00", city: "昨天", temperature: 25 },
        // { month: "20:00", city: "今天", temperature: 17 },
        { month: "22:00", city: "昨天", temperature: 26 },
        // { month: "22:00", city: "今天", temperature: 16 },
        { month: "24:00", city: "昨天", temperature: 23 },
        // { month: "24:00", city: "今天", temperature: 14 },
        
      ];

      const chart = new Chart({
        container: "option1",
        autoFit: true,
        height: 500,
      });

      chart.data(data);
      chart.scale({
        month: {
          range: [0, 1],
        },
        temperature: {
          nice: true,
        },
      });

      chart.tooltip({
        showCrosshairs: true,
        shared: true,
      });

      chart.axis("temperature", {
        label: {
          formatter: (val) => {
            return val + " °C";
          },
        },
      });

      chart
        .line()
        .position("month*temperature")
        .color("city")
        .shape("smooth");

      chart
        .area()
        .position("month*temperature")
        .color("city")
        .shape("smooth");

      chart
        .point()
        .position("month*temperature")
        .color("city")
        .shape("circle");

      chart.render();
    },
    chart2() {
      
    }
  },
};
</script>

<style lang="scss" scope>
  /deep/ .el-card{
    .el-card__header{}
  }
</style>