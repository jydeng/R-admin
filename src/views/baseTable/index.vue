<template>
  <div>
    <i-breadcrumb></i-breadcrumb>
    <i-searchPart>
      <el-col :md="6" :sm="24">
        <el-date-picker
          v-model="selectedDate"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </el-col>
      <el-col :md="6" :sm="24">
        <el-input
          placeholder="请输入产品名"
          clearable
          v-model="product_name"
        ></el-input>
      </el-col>
      <el-col :md="6" :sm="24">
        <el-button type="primary" plain @click="search">
          <i class="fa fa-fw fa-search"></i> 搜索
        </el-button>
      </el-col>
    </i-searchPart>

    <i-tablePart>
      <i-table
        :columns="columns"
        :data="tableData"
        :total="totalSize"
        :height="700"
        :isLoading="loading"
        @turningPage="turningPage"
      >
        <el-table-column slot="operationBtn" label="slot模式定义复杂列">
          <template slot-scope="{ row }">
            <el-button type="text" @click="click(row)" title="报表">
              <i class="fa fa-fw fa fa-line-chart"></i>
            </el-button>
            <el-button type="text" title="编辑">
              <i class="fa fa-fw fa-pencil"></i>
            </el-button>
            <el-button type="text" title="删除">
              <i class="fa fa-fw fa-times"></i>
            </el-button>
          </template>
        </el-table-column>
      </i-table>
    </i-tablePart>
  </div>
</template>
<script>
import operation from "./operation";
import Emitter from "@/mixins/emitter";
export default {
  name: "baseTable",
  mixins: [Emitter],
  data() {
    return {
      selectedDate: ["", ""],
      pickerOptions: {
        shortcuts: this.$storage.dateShortcuts,
        disabledDate(date) {
          return date.getTime() > new Date().getTime();
        }
      },
      product_name: "",
      page: 1,
      columns: [
        { label: "ID", prop: "id" },
        { label: "产品名", prop: "product_name" },
        { label: "component模式定义复杂列", component: operation },
        { slot: "operationBtn" }
      ],
      tableData: [],
      totalSize: 0,
      loading: false
    };
  },
  methods: {
    search() {
      this.tableData = [
        { id: "1", product_name: "产品A" },
        { id: "2", product_name: "产品B" },
        { id: "3", product_name: "产品C" }
      ];
      this.totalSize = 3;
    },
    turningPage(page) {
      this.page = page;
      this.handleSearch();
    },
    click(row) {
      console.log(row);
    },
    msg(m) {
      console.log(m);
    }
  },
  created() {
    this.$on("msg", this.msg);
  },
  activated() {
    this.search();
  }
};
</script>
