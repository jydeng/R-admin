<template>
  <el-row>

    <Rbreadcrumb></Rbreadcrumb>

    <el-row class="searchPart" :gutter="10">
      <el-col :md="6" :sm="24">
        <el-date-picker v-model="selectedDate" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions"></el-date-picker>
      </el-col>
      <el-col :md="6" :sm="24">
        <el-input placeholder="请输入产品名" clearable v-model="product_name"></el-input>
      </el-col>
      <el-col :md="6" :sm="24">
        <el-button type="primary" plain @click="handleSearch">
          <i class="fa fa-fw fa-search"></i> 搜索
        </el-button>
      </el-col>
    </el-row>

    <el-row class="tablePart">
      <Rtable :columns="columns" :tableData="tableData" :totalSize="totalSize" :loading="loading" @changePage="handleChangePage">
        <el-table-column slot="operationBtn" label="操作" :width="'180px'">
          <template slot-scope="scope">
            <el-button type="text">
              报表
            </el-button>
            <el-button type="text">
              编辑
            </el-button>
            <el-button type="text">
              删除
            </el-button>
          </template>
        </el-table-column>
      </Rtable>
    </el-row>
  </el-row>
</template>
<script>
export default {
  name: "Table",
  data() {
    return {
      selectedDate: ["", ""],
      pickerOptions: {
        shortcuts: this.elementHelper.dateShortcuts,
        disabledDate(date) {
          return date.getTime() > new Date().getTime();
        }
      },
      product_name: "",
      page: 1,
      columns: [
        { label: "ID", prop: "id" },
        { label: "产品名", prop: "product_name" },
        { slotName: "operationBtn" }
      ],
      tableData: [],
      totalSize: 0,
      loading: false
    };
  },
  methods: {
    handleSearch() {
      this.tableData = [
        { id: "1", product_name: "产品A" },
        { id: "2", product_name: "产品B" },
        { id: "3", product_name: "产品C" }
      ];
      this.totalSize = 3;
    },
    handleChangePage(page) {
      this.page = page;
      this.handleSearch();
    }
  },
  mounted() {
    this.handleSearch();
  }
};
</script>
