<template>
  <div class="admin-index">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row :gutter="20">
      <el-col :span="14">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>访问次数统计</span>
          </div>
          <div id="option1" style="height:28vh;"></div>
        </el-card>
      </el-col>
      <el-col :span="10">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>周访问量</span>
          </div>
          <div id="option2" style="height:28vh;"></div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>网址分类统计</span>
          </div>
          <div id="option3" style="height:28vh;"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { Chart } from "@antv/g2";
export default {
  mounted() {
    this.chart1();
    this.chart2();
    this.chart3();
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
      const data = [
        { year: "星期一", sales: 38 },
        { year: "星期二", sales: 52 },
        { year: "星期三", sales: 61 },
        { year: "星期四", sales: 85 },
        { year: "星期五", sales: 48 },
        { year: "星期六", sales: 10 },
        { year: "星期日", sales: 2 },
      ];
      const chart = new Chart({
        container: "option2",
        autoFit: true,
        height: 500,
      });

      chart.data(data);
      chart.scale("sales", {
        nice: true,
      });

      chart.tooltip({
        showMarkers: false,
      });
      chart.interaction("active-region");

      chart.interval().position("year*sales");

      chart.render();
    },
    chart3() {
      const data = [
        { item: "常用网站", count: 20, percent: 0.3175 },
        { item: "常用插件", count: 4, percent: 0.0635 },
        { item: "工具", count: 8, percent: 0.127 },
        { item: "设计相关", count: 7, percent: 0.1111 },
        { item: "框架", count: 7, percent: 0.1111 },
        { item: "文档", count: 8, percent: 0.127 },
        { item: "学习网站", count: 9, percent: 0.1428 },
      ];

      const chart = new Chart({
        container: "option3",
        autoFit: true,
        height: 500,
      });

      chart.coordinate("theta", {
        radius: 0.75,
        innerRadius: 0.6,
      });

      chart.data(data);

      chart.tooltip(false);

      // 声明需要进行自定义图例字段： 'item'
      chart.legend("item", {
        position: "right", // 配置图例显示位置
        custom: true, // 关键字段，告诉 G2，要使用自定义的图例
        items: data.map((obj, index) => {
          return {
            name: obj.item, // 对应 itemName
            value: obj.percent, // 对应 itemValue
            marker: {
              symbol: "square", // marker 的形状
              style: {
                r: 4, // marker 图形半径
                fill: chart.getTheme().colors10[index], // marker 颜色，使用默认颜色，同图形对应
              },
            }, // marker 配置
          };
        }),
      });

      chart
        .interval()
        .adjust("stack")
        .position("count")
        .color("item")
        .style({
          fillOpacity: 1,
        })
        .state({
          active: {
            style: (element) => {
              const shape = element.shape;
              return {
                lineWidth: 10,
                stroke: shape.attr("fill"),
                strokeOpacity: shape.attr("fillOpacity"),
              };
            },
          },
        });

      // 移除图例点击过滤交互
      chart.removeInteraction("legend-filter");
      chart.interaction("element-active");

      chart.render();

      // 监听 element 上状态的变化来动态更新 Annotation 信息
      chart.on("element:statechange", (ev) => {
        const { state, stateStatus, element } = ev.gEvent.originalEvent;

        // 本示例只需要监听 active 的状态变化
        if (state === "active") {
          const data = element.getData();
          if (stateStatus) {
            // 更新 Annotation
            updateAnnotation(data);
          } else {
            // 隐藏 Annotation
            clearAnnotation();
          }
        }
      });

      // 绘制 annotation
      let lastItem;
      function updateAnnotation(data) {
        if (data.item !== lastItem) {
          chart.annotation().clear(true);
          chart
            .annotation()
            .text({
              position: ["50%", "50%"],
              content: data.item,
              style: {
                fontSize: 14,
                fill: "#8c8c8c",
                textAlign: "center",
              },
              offsetY: -10,
            })
            .text({
              position: ["50%", "50%"],
              content: data.count,
              style: {
                fontSize: 18,
                fill: "#8c8c8c",
                textAlign: "center",
              },
              offsetX: -10,
              offsetY: 10,
            })
            .text({
              position: ["50%", "50%"],
              content: "个",
              style: {
                fontSize: 14,
                fill: "#8c8c8c",
                textAlign: "center",
              },
              offsetY: 10,
              offsetX: 10,
            });
          chart.render(true);
          lastItem = data.item;
        }
      }

      // 清空 annotation
      function clearAnnotation() {
        chart.annotation().clear(true);
        chart.render(true);
        lastItem = null;
      }
    },
  },
};
</script>

<style lang="scss" scope>
/deep/ .el-card {
  .el-card__header {
    padding: 10px 20px;
  }
}
.box-card {
  margin-bottom: 20px;
}
</style>
