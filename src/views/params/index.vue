<template>
  <div>
    <i-breadcrumb></i-breadcrumb>
    <el-row class="searchPart" :gutter="10">
      <el-col :md="6" :sm="24">
        <i-params v-model="test" placeholder="请输入监控链地址"></i-params>
      </el-col>
      <el-col :md="6" :sm="24">
        <el-button type="primary" plain @click="dialogVisible = true"
          >在弹窗中使用</el-button
        >
      </el-col>
    </el-row>
    <el-dialog title="在弹窗中使用" :visible.sync="dialogVisible">
      <i-params v-model="test" placeholder="请输入监控链地址"></i-params>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "params",
  data() {
    return {
      dialogVisible: false,
      test: "https://www.a.com?a=1&b=2&c=3&d=4"
    };
  }
};
</script>
