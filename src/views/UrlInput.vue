<template>
  <el-row>
    <Rbreadcrumb></Rbreadcrumb>
    <el-row class="searchPart" :gutter="10">
      <el-col :md="6" :sm="24">
        <RurlInput v-model="test" placeholder="请输入监控链地址" :position="true"></RurlInput>
      </el-col>
      <el-col :md="6" :sm="24">
        <el-button type="primary" plain @click="dialogVisible=true">在弹窗中使用</el-button>
      </el-col>
    </el-row>
    <el-dialog title="在弹窗中使用" :visible.sync="dialogVisible">
      <RurlInput v-model="test" placeholder="请输入监控链地址"></RurlInput>
    </el-dialog>
  </el-row>
</template>
<script>
export default {
  name: "urlInput",
  data() {
    return {
      dialogVisible: false,
      test: "https://www.a.com?a=1&b=2&c=3&d=4"
    };
  }
};
</script>
