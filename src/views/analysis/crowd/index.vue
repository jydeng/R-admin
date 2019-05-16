<template>
  <div style="height:100%">
    <div
      id="chart"
      :style="{ width: 'calc(100% - 10px)', height: '100%' }"
    ></div>
  </div>
</template>
<script>
import echarts from "echarts";
export default {
  name: "crowd",
  data() {
    return {
      chart: null
    };
  },
  methods: {
    initChart() {
      let option = {
        title: {
          text: "今日买量人群分析",
          subtext: "2019-01-01",
          x: "center",
          y: 10
        },
        legend: { show: false },
        tooltip: {},
        series: [
          {
            type: "pie",
            radius: 60,
            center: ["50%", "25%"],
            data: [
              { name: "男性", value: 130222 },
              { name: "女性", value: 186222 },
              { name: "未设置", value: 16222 }
            ],
            color: ["#1ba4db", "#f98971", "#666666"]
          },
          {
            name: "女性",
            type: "pie",
            radius: [80, 110],
            center: ["35%", "60%"],
            roseType: "radius",
            lableLine: {
              normal: {
                show: false
              },
              emphasis: {
                show: true
              }
            },
            data: [
              { value: 10, name: "女性18岁以下" },
              { value: 5, name: "女性19-23岁" },
              { value: 15, name: "女性24-30岁" },
              { value: 25, name: "女性31-40岁" },
              { value: 20, name: "女性40岁以上" }
            ],
            color: ["#ffdbcd", "#f5b2a1", "#f68871", "#eb604d", "#e02129"]
          },
          {
            name: "男性",
            type: "pie",
            radius: [80, 110],
            center: ["70%", "60%"],
            roseType: "radius",
            lableLine: {
              normal: {
                show: false
              },
              emphasis: {
                show: true
              }
            },
            data: [
              { value: 10, name: "男性18岁以下" },
              { value: 5, name: "男性19-23岁" },
              { value: 15, name: "男性24-30岁" },
              { value: 25, name: "男性31-40岁" },
              { value: 20, name: "男性40岁以上" }
            ],
            color: ["#8dcced", "#4cbfeb", "#2ba6d2", "#4988cb", "#5484b5"]
          }
        ]
      };

      if (this.chart === null) {
        this.chart = echarts.init(document.getElementById("chart"));
      }
      this.chart.setOption(option);
    }
  },
  mounted() {
    setTimeout(() => {
      this.initChart();
    }, 2000);
  },
  beforeDestroy() {
    if (this.chart !== null) {
      this.chart.dispose();
    }
  }
};
</script>
