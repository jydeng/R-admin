<template>
  <el-row class="dashboard">
    <!-- 切换平台 -->
    <el-tabs class="" v-model="activeChanel" @tab-click="handleClickTab">
      <el-tab-pane label="全平台" name="all"></el-tab-pane>
      <el-tab-pane label="渠道1" name="weibo1"></el-tab-pane>
      <el-tab-pane label="渠道2" name="weibo2"></el-tab-pane>
      <el-tab-pane label="渠道3" name="douyin"></el-tab-pane>
    </el-tabs>

    <!-- 今日消耗 -->
    <el-row :gutter="20">
      <el-col :sm="24" :md="8">
        <div class="legend">
          <h3 class="legend-title">
            今日实时消耗 (元)
            <el-tooltip effect="dark" content="计算当天 00:00-23:59 消耗总额" placement="top">
              <i class="fa fa-question-circle"></i>
            </el-tooltip>
          </h3>
          <div class="legend-content" :style="{color:themeColor}">
            999999
          </div>
        </div>
      </el-col>
    </el-row>

    <!-- 日期选择 -->
    <el-row :gutter="20" class="dateRange">
      <el-col :sm="24" :md="6">
        <el-date-picker v-model="selectedDate" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
        </el-date-picker>
      </el-col>
      <el-col :sm="24" :md="6">
        <el-button>
          <i class="fa fa-fw fa-download"></i> 下载
        </el-button>
      </el-col>
    </el-row>

    <!-- 图表 -->
    <el-row class="chartPart">
      <el-col :sm="24" :md="24">
        <div id="chart" :style="{width:'calc(100% - 10px)',height:'320px'}"></div>
      </el-col>
    </el-row>

    <!-- 数据表格 -->
    <el-row class="tablePart">
      <Rtable :columns="columns" :tableData="tableData" :totalSize="totalSize" :loading="loading" @changePage="handleChangePage" :height="250"></Rtable>
    </el-row>
  </el-row>
</template>

<script>
import { dateShortcuts } from "@/helpers/elementHelper";
import Rtable from "@/common/Rtable";
import { mapGetters } from "vuex";
// 按需引入 echarts
const echarts = require("echarts/lib/echarts");
// 引入折线图
require("echarts/lib/chart/line");
// 引入渐变填充
require("echarts/lib/component/graphic");
// 引入图例
require("echarts/lib/component/legend");
// 引入提示
require("echarts/lib/component/tooltip");

export default {
  name: "Dashboard",
  components: {
    Rtable
  },
  data() {
    return {
      activeChanel: "all",
      selectedDate: ["", ""],
      pickerOptions: {
        shortcuts: dateShortcuts
      },
      page: 1,
      columns: [
        { prop: "date", label: "日期" },
        { prop: "field1", label: "消耗" },
        { prop: "field2", label: "曝光" },
        { prop: "field3", label: "互动量" },
        { prop: "field4", label: "互动率" },
        { prop: "field5", label: "点击量" },
        { prop: "field6", label: "点击率" }
      ],
      tableData: [],
      totalSize: 0,
      loading: false,
      chart: null
    };
  },
  computed: {
    ...mapGetters(["themeColor"])
  },
  methods: {
    // 切换渠道
    handleClickTab() {},
    // 搜索
    handleSearch() {
      // TODO: 依据activeChanel 和  selectedDate查询数据
      const data = {
        date: [
          "2018-04-21",
          "2018-04-22",
          "2018-04-23",
          "2018-04-24",
          "2018-04-25",
          "2018-04-26",
          "2018-04-27"
        ],
        consume: [120, 132, 101, 134, 90, 230, 210],
        exposure: [82, 93, 90, 94, 190, 130, 320],
        interact: [20, 32, 901, 934, 290, 1330, 1320],
        click: [82, 93, 91, 934, 1290, 130, 130]
      };
      this.handleDrawChart(data);
    },
    // 接收翻页消息
    handleChangePage() {},
    // 生成图表参数
    gChartOp(data) {
      // 生成渐变填充
      const gAreaStyle = (color1, color2) => {
        const areaStyle = {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: color1
              },
              {
                offset: 1,
                color: color2
              }
            ])
          }
        };

        return areaStyle;
      };
      const chartOp = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross"
          }
        },
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
    },
    // 绘制图表
    handleDrawChart(data) {
      const chartOp = this.gChartOp(data);
      if (this.chart === null) {
        this.chart = echarts.init(document.getElementById("chart"));
      }
      this.chart.setOption(chartOp);
    }
  },
  mounted() {
    // 初始化查询一次
    this.handleSearch();
  }
};
</script>

<style lang="scss" scoped>
.dashboard {
  padding: 5px;

  .legend {
    height: 120px;
    padding: 10px;
    background: #fafafa;
    border: 1px solid #dddddd;
    border-radius: 3px;

    .legend-title {
      font-size: 14px;
      margin: 0;
      height: 30px;
      line-height: 30px;
      font-weight: 400;
      text-indent: 10px;
    }

    .legend-content {
      height: 70px;
      line-height: 70px;
      font-size: 30px;
      color: #409eff;
      text-indent: 20px;
      transition: all 0.6s;
    }
  }

  .dateRange {
    padding: 5px 0;
    .el-date-editor {
      width: 100%;
    }
  }

  .chartPart {
    margin-bottom: 5px;
  }
}
</style>
