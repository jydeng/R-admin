<template>
  <div>
    <i-searchPart>
      <el-col :md="6" :sm="24">
        <iDateRange v-model="selectedDate"></iDateRange>
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
        :isLoading="tableLoading"
        @turningPage="turningPage"
      >
        <el-table-column type="selection" slot="checkbox"></el-table-column>
        <el-table-column slot="operationBtn" label="复杂列(slot模式)">
          <template slot="header">
            <el-tooltip effect="dark" placement="bottom">
              <div slot="content">
                element推荐的方式，编写相应的插槽，好处是使用方便，不便的是若列太复杂，代码会很长，而且不好分割
              </div>
              <span>
                复杂列(slot模式)
                <i class="fa fa-question-circle"></i>
              </span>
            </el-tooltip>
          </template>
          <template slot-scope="{ row }">
            <el-button type="text" @click="click(row)" title="报表">
              <i class="fa fa-fw fa fa-line-chart"></i>
            </el-button>
            <el-button type="text" @click="click(row)" title="编辑">
              <i class="fa fa-fw fa-pencil"></i>
            </el-button>
            <el-button type="text" @click="click(row)" title="删除">
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
export default {
  name: "baseTable",
  data() {
    return {
      selectedDate: ["", ""],
      product_name: "",
      page: 1,
      columns: [
        { slot: "checkbox" },
        { label: "id", prop: "id" },
        { label: "产品", prop: "name" },
        { label: "复杂列(component模式)", component: operation },
        { slot: "operationBtn" }
      ],
      tableData: [],
      totalSize: 0,
      tableLoading: false
    };
  },
  methods: {
    search() {
      this.tableData = [
        { id: "1", name: "产品A" },
        { id: "2", name: "产品B" },
        { id: "3", name: "产品C" }
      ];
      this.totalSize = 3;
    },
    turningPage(page) {
      this.page = page;
      this.handleSearch();
    },
    click() {
      this.$notify({
        title: "提示",
        message: "slot模式列",
        type: "success"
      });
    },
    msg(m) {
      this.$notify({
        title: "提示",
        message: m,
        type: "success"
      });
    }
  },
  created() {
    this.$on("msg", this.msg);
  },
  mounted() {
    this.search();
  }
};
</script>
