<template>
  <div class="dashboard">
    <el-row :gutter="20">
      <el-col :sm="24" :md="12">
        <div class="legend">
          <h3 class="legend-title">
            今日消耗 (元)
            <el-tooltip
              effect="dark"
              content="计算当天 00:00-23:59 消耗总额"
              placement="top"
            >
              <i class="fa fa-question-circle"></i>
            </el-tooltip>
          </h3>
          <div class="legend-content" :style="{ color: themeColor }">
            {{ `￥${consume}` }}
          </div>
        </div>
      </el-col>
      <el-col :sm="24" :md="12">
        <div class="legend">
          <h3 class="legend-title">
            订单详细数据
            <el-tooltip
              effect="dark"
              content="所有渠道产品订单数据"
              placement="top"
            >
              <i class="fa fa-question-circle"></i>
            </el-tooltip>
          </h3>
          <table class="legend-table">
            <tbody>
              <tr>
                <td>
                  总订单数：
                  <span :style="{ color: themeColor }">{{ order.total }}</span>
                </td>
                <td>
                  过审订单数：
                  <span :style="{ color: themeColor }">{{ order.allow }}</span>
                </td>
              </tr>
              <tr>
                <td>
                  未启动订单数：
                  <span :style="{ color: themeColor }">{{ order.stop }}</span>
                </td>
                <td>
                  启动订单数：
                  <span :style="{ color: themeColor }">{{ order.start }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="dateRange">
      <el-col :sm="24" :md="8">
        <iDateRange v-model="selectedDate" @change="search"></iDateRange>
      </el-col>
      <el-col :sm="24" :md="4">
        <el-button> <i class="fa fa-fw fa-download"></i> 下载 </el-button>
      </el-col>
    </el-row>

    <el-row class="chartPart">
      <el-col :sm="24" :md="24">
        <div
          id="chart"
          :style="{ width: 'calc(100% - 10px)', height: '320px' }"
        ></div>
      </el-col>
    </el-row>

    <el-row class="tablePart">
      <i-table
        background
        :columns="columns"
        :data="data"
        :total="total"
        :isLoading="tableLoading"
        :height="270"
        @turningPage="turningPage"
      ></i-table>
    </el-row>
  </div>
</template>

<script>
import echarts from "echarts";
import { mapGetters } from "vuex";
import { gChartOp } from "./chart";
export default {
  name: "dashboard",
  data() {
    return {
      selectedDate: ["", ""],
      columns: [
        { prop: "date", label: "日期" },
        { prop: "field1", label: "消耗" },
        { prop: "field2", label: "曝光" },
        { prop: "field3", label: "互动量" },
        { prop: "field4", label: "互动率" },
        { prop: "field5", label: "点击量" },
        { prop: "field6", label: "点击率" }
      ],
      data: [
        {
          date: "2019-01-02",
          field1: 120,
          field2: 820,
          field3: 100,
          field4: "10%",
          field5: 50,
          field6: "5%"
        },
        {
          date: "2019-01-03",
          field1: 120,
          field2: 820,
          field3: 100,
          field4: "10%",
          field5: 50,
          field6: "5%"
        },
        {
          date: "2019-01-04",
          field1: 120,
          field2: 820,
          field3: 100,
          field4: "10%",
          field5: 50,
          field6: "5%"
        },
        {
          date: "2019-01-05",
          field1: 120,
          field2: 820,
          field3: 100,
          field4: "10%",
          field5: 50,
          field6: "5%"
        },
        {
          date: "2019-01-06",
          field1: 120,
          field2: 820,
          field3: 100,
          field4: "10%",
          field5: 50,
          field6: "5%"
        },
        {
          date: "2019-01-07",
          field1: 120,
          field2: 820,
          field3: 100,
          field4: "10%",
          field5: 50,
          field6: "5%"
        },
        {
          date: "2019-01-08",
          field1: 120,
          field2: 820,
          field3: 100,
          field4: "10%",
          field5: 50,
          field6: "5%"
        },
        {
          date: "2019-01-09",
          field1: 120,
          field2: 820,
          field3: 100,
          field4: "10%",
          field5: 50,
          field6: "5%"
        },
        {
          date: "2019-01-10",
          field1: 120,
          field2: 820,
          field3: 100,
          field4: "10%",
          field5: 50,
          field6: "5%"
        }
      ],
      total: 10,
      tableLoading: false,
      page: 1,
      chart: null,
      consume: Math.ceil(Math.random() * 99999),
      order: {
        total: 100,
        allow: 90,
        start: 60,
        stop: 40
      }
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
    search() {
      const data = {
        date: [
          "2019-01-02",
          "2019-01-03",
          "2019-01-04",
          "2019-01-05",
          "2019-01-06",
          "2019-01-07",
          "2019-01-08",
          "2019-01-09",
          "2019-01-10"
        ],
        consume: [120, 132, 101, 134, 90, 230, 210, 1000, 600],
        exposure: [82, 93, 90, 94, 190, 130, 320, 900, 1000],
        interact: [20, 32, 901, 934, 290, 1330, 1320, 1500, 1200],
        click: [82, 93, 91, 934, 1290, 130, 130, 90, 100]
      };
      this.drawChart(data);
    },
    // 接收翻页消息
    turningPage() {},
    // 绘制图表
    drawChart(data) {
      const chartOp = gChartOp(data, echarts);
      if (this.chart === null) {
        this.chart = echarts.init(document.getElementById("chart"));
        window.addEventListener("resize", this.chart.resize);
      }
      this.chart.setOption(chartOp);
    },
    // 数字增长函数
    numGrow(start, target, time, cb) {
      let num = start;
      let step = Math.ceil((target - start) / ((1000 / 16) * time));
      let temp;
      function f() {
        num += step;
        if (num >= target) {
          num = target;
          cancelAnimationFrame(temp);
        } else {
          temp = requestAnimationFrame(f);
        }
        cb(num);
      }

      f();
    }
  },
  mounted() {
    setTimeout(() => {
      // 初始化查询一次
      this.search();
      // 数据动画
      this.numGrow(0, this.consume, 2, num => (this.consume = num));
      this.numGrow(0, this.order.total, 1.5, num => (this.order.total = num));
      this.numGrow(0, this.order.allow, 1.5, num => (this.order.allow = num));
      this.numGrow(0, this.order.start, 1.5, num => (this.order.start = num));
      this.numGrow(0, this.order.stop, 1.5, num => (this.order.stop = num));
    }, 2000);
  },
  beforeDestroy() {
    if (this.chart !== null) {
      window.removeEventListener("resize", this.chart.resize);
      this.chart.dispose();
    }
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

    .legend-table {
      width: 100%;
      margin: 10px 5px 0 5px;
    }
    .legend-table td {
      padding: 5px 0;
      font-size: 13px;
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
