<template>
  <el-date-picker
    v-model="selectedDate"
    format="yyyy 年 MM 月 dd 日"
    value-format="yyyy-MM-dd"
    type="daterange"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    :picker-options="pickerOptions"
    @change="selectDate"
  ></el-date-picker>
</template>
<script>
export default {
  name: "iDateRange",
  props: {
    value: {
      type: Array,
      default: function() {
        return ["", ""];
      }
    },
    disabledDate: {
      type: Function,
      default: function(date) {
        return date.getTime() > new Date().getTime();
      }
    },
    shortcuts: {
      type: Array,
      default: function() {
        return [
          {
            text: "昨天",
            onClick(picker) {
              const end = new Date();
              const start = new Date();

              start.setTime(start.getTime() - 3600 * 1000 * 24);
              end.setTime(end.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "今天",
            onClick(picker) {
              const end = new Date();
              const start = new Date();

              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();

              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();

              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();

              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ];
      }
    }
  },
  data() {
    return {
      selectedDate: "",
      pickerOptions: {
        shortcuts: this.shortcuts,
        disabledDate: this.disabledDate
      }
    };
  },
  computed: {
    dateRange() {
      let valid = this.selectedDate && this.selectedDate.length;
      let startDate = valid ? this.selectedDate[0] : "";
      let endDate = valid ? this.selectedDate[1] : "";
      return [startDate, endDate];
    }
  },
  watch: {
    value(val) {
      this.selectedDate = val;
    }
  },
  methods: {
    selectDate() {
      this.$emit("input", this.dateRange);
      this.$emit("change", this.dateRange);
    }
  },
  mounted() {
    if (this.value[0] !== "" && this.value[1] !== "") {
      this.selectedDate = this.value;
    }
  }
};
</script>
