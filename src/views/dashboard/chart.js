// 按需引入 echarts
const e = require("echarts/lib/echarts");
// 引入折线图
require("echarts/lib/chart/line");
// 引入渐变填充
require("echarts/lib/component/graphic");
// 引入图例
require("echarts/lib/component/legend");
// 引入提示
require("echarts/lib/component/tooltip");

// 生成echart配置
export function gChartOp(data) {
  // 生成渐变填充
  const gAreaStyle = (color1, color2) => {
    const areaStyle = {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: color1 },
          { offset: 1, color: color2 }
        ])
      }
    };
    return areaStyle;
  };
  const chartOp = {
    tooltip: { trigger: "axis", axisPointer: { type: "cross" } },
    legend: {
      data: ["消耗", "曝光", "互动量", "点击量"],
      selected: {
        消耗: true,
        曝光: false,
        互动量: false,
        点击量: false,
        ECPM: false
      }
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: data.date
      }
    ],
    yAxis: [
      {
        type: "value"
      }
    ],
    series: [
      {
        name: "消耗",
        type: "line",
        data: data.consume,
        areaStyle: gAreaStyle("rgb(255, 158, 68)", "rgb(255, 70, 131)")
      },
      {
        name: "曝光",
        type: "line",
        data: data.exposure,
        areaStyle: gAreaStyle("rgb(0, 102, 204)", "rgb(0, 204, 255)")
      },
      {
        name: "互动量",
        type: "line",
        data: data.interact,
        areaStyle: gAreaStyle("rgb(255, 153, 0)", "rgb(255, 204, 153)")
      },
      {
        name: "点击量",
        type: "line",
        data: data.click,
        areaStyle: gAreaStyle("rgb(153,0,204)", "rgb(153,102,255)")
      }
    ],
    color: ["#FF3300", "#0099CC", "#FF9900", "#9933CC"]
  };

  return chartOp;
}

// 导出echarts
export const echarts = e;
