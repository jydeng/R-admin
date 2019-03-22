<template>
  <el-row class="dashboard">
    <!-- 切换平台 -->
    <el-tabs class v-model="activeChanel" @tab-click="handleSearch">
      <el-tab-pane label="全平台" name="all"></el-tab-pane>
      <el-tab-pane label="渠道A" name="a"></el-tab-pane>
      <el-tab-pane label="渠道B" name="b"></el-tab-pane>
      <el-tab-pane label="渠道C" name="c"></el-tab-pane>
    </el-tabs>

    <!-- 今日消耗 -->
    <el-row :gutter="20">
      <el-col :sm="24" :md="8">
        <div class="legend">
          <h3 class="legend-title">
            今日实时消耗 (元)
            <el-tooltip
              effect="dark"
              content="计算当天 00:00-23:59 消耗总额"
              placement="top"
            >
              <i class="fa fa-question-circle"></i>
            </el-tooltip>
          </h3>
          <div class="legend-content" :style="{ color: themeColor }">999999</div>
        </div>
      </el-col>
    </el-row>

    <!-- 日期选择 -->
    <el-row :gutter="20" class="dateRange">
      <el-col :sm="24" :md="6">
        <el-date-picker
          v-model="selectedDate"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
          @change="handleSearch"
        ></el-date-picker>
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
        <div
          id="chart"
          :style="{ width: 'calc(100% - 10px)', height: '320px' }"
        ></div>
      </el-col>
    </el-row>

    <!-- 数据表格 -->
    <el-row class="tablePart">
      <Rtable
        :columns="columns"
        :tableData="tableData"
        :totalSize="totalSize"
        :loading="loading"
        @changePage="handleChangePage"
        :height="250"
      ></Rtable>
    </el-row>
  </el-row>
</template>

<script>
import { mapGetters } from "vuex";
import { gChartOp, echarts } from "./chart";

export default {
  name: "dashboard",
  data() {
    return {
      activeChanel: "all",
      selectedDate: ["", ""],
      pickerOptions: {
        shortcuts: this.$storage.dateShortcuts
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
    ...mapGetters("common", ["themeColor", "isCollapse"])
  },
  watch: {
    isCollapse: () => {
      setTimeout(() => {
        window.dispatchEvent(new Event("resize"));
      }, 1000);
    }
  },
  methods: {
    // 搜索
    handleSearch() {
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
    // 绘制图表
    handleDrawChart(data) {
      const chartOp = gChartOp(data);
      if (this.chart === null) {
        this.chart = echarts.init(document.getElementById("chart"));
        window.addEventListener("resize", this.chart.resize);
      }
      this.chart.setOption(chartOp);
    }
  },
  activated() {
    // 初始化查询一次
    this.handleSearch();
  },
  deactivated() {
    window.removeEventListener("resize", this.chart.resize);
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
