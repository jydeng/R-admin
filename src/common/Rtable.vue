<template>
  <el-row>
    <el-row>
      <!-- 表格 -->
      <el-table v-loading="loading" :data="tableData" border :header-row-class-name="headerClass" :row-class-name="rowClassName" :height="height">
        <template v-for="(column,index) in columns">
          <!-- 插槽 -->
          <slot v-if="column.slotName" :name="column.slotName" slot-scope="scope"></slot>
          <!-- normal -->
          <el-table-column v-else :key="index" :prop="column.prop" :label="column.label" :sortable="column.sort" :fixed="column.fixed" :show-overflow-tooltip="true" :formatter="column.formatter">
          </el-table-column>
        </template>
      </el-table>
    </el-row>
    <el-row v-if="pagination">
      <!-- 分页 -->
      <el-pagination background layout="jumper, prev, pager, next, total " :total="totalSize" :page-size="pageSize" :current-page="currentPage" @current-change="handleChangePage">
      </el-pagination>
    </el-row>
  </el-row>

</template>

<script>
export default {
  name: "Rtable",
  props: {
    // 列名
    columns: Array,
    // 数据
    tableData: Array,
    // 高度
    height: {
      type: Number,
      default: window.innerHeight - 300
    },
    // 行样式
    rowClassName: {
      type: Function,
      default() {
        return "";
      }
    },
    // 列头样式
    headerClass: {
      type: String,
      default: "row-bg-gray"
    },
    // 加载状态
    loading: {
      type: Boolean,
      default: false
    },
    // 是否显示分页
    pagination: {
      type: Boolean,
      default: true
    },
    // 总条目
    totalSize: {
      type: Number,
      default: 0
    },
    // 每页条目
    pageSize: {
      type: Number,
      default: 10
    },
    // 当前分页
    currentPage: {
      type: Number,
      default: 1
    }
  },
  methods: {
    // 点击分页
    handleChangePage(currentPage) {
      this.$emit("changePage", { page: currentPage, pageSize: this.pageSize });
    }
  }
};
</script>
