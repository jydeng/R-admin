<template>
  <el-table-column :label="column.label">
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
</template>
<script>
export default {
  props: ["column"],
  methods: {
    click(row) {
      console.log(row);
    }
  }
};
</script>
