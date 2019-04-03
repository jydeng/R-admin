<template>
  <div>
    <!-- 表格 -->
    <el-table
      border
      header-row-class-name="row-bg-gray"
      v-loading="isLoading"
      :data="data"
      :row-class-name="rowClass"
      :height="height"
      @selection-change="selection"
    >
      <template v-for="(column, i) in columns">
        <!-- 简单的使用 -->
        <slot v-if="column.slot" :name="column.slot"></slot>

        <!-- 很复杂的使用，单独写一个模板 -->
        <component
          v-else-if="column.component"
          :is="column.component"
          :key="i"
          :column="column"
        ></component>

        <!-- 特别简单 -->
        <el-table-column v-else :key="i" v-bind="column"></el-table-column>
      </template>
    </el-table>

    <div v-if="isPagin">
      <!-- 分页 -->
      <el-pagination
        layout="prev, pager, next, total"
        :total="total"
        :page-size="pageSize"
        :current-page="page"
        @current-change="turningPage"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "iTable",
  props: {
    // 列名
    columns: {
      type: Array,
      default: function() {
        return [];
      }
    },
    // 数据
    data: {
      type: Array,
      default: function() {
        return [];
      }
    },
    // 高度
    height: {
      type: Number,
      default: 300
    },
    // 行样式 { row, rowIndex }
    rowClass: {
      type: Function,
      default: function() {
        return "";
      }
    },
    // 加载状态
    isLoading: {
      type: Boolean,
      default: false
    },
    // 是否显示分页
    isPagin: {
      type: Boolean,
      default: true
    },
    // 总条目
    total: {
      type: Number,
      default: 0
    },
    // 每页条目
    pageSize: {
      type: Number,
      default: 10
    },
    // 当前分页
    page: {
      type: Number,
      default: 1
    }
  },
  methods: {
    // 翻页
    turningPage(currentPage) {
      this.$emit("turningPage", { page: currentPage, pageSize: this.pageSize });
    },
    // checkbox 选中触发
    selection(selection) {
      this.$emit("selection", selection);
    }
  }
};
</script>
<style lang="scss">
/* table样式 */
.el-table thead th {
  color: #606266;
  font-weight: 400;
  background: #f5f7fa;
}
/* 修改Rtable 分页栏的位置 */
.el-pagination {
  margin-top: 10px;
  text-align: right;
}
</style>
