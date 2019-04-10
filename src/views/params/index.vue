<template>
  <div>
    <i-breadcrumb></i-breadcrumb>
    <el-row class="searchPart" :gutter="10">
      <el-col :md="6" :sm="24">
        <ElementParamsInput
          v-model="test"
          placeholder="请输入监控链地址"
        ></ElementParamsInput>
      </el-col>
      <el-col :md="6" :sm="24">
        <el-button type="primary" plain @click="dialogVisible = true"
          >在弹窗中使用</el-button
        >
      </el-col>
    </el-row>
    <el-dialog title="在弹窗中使用" :visible.sync="dialogVisible">
      <element-params-input
        v-model="test"
        placeholder="请输入监控链地址"
      ></element-params-input>
    </el-dialog>
  </div>
</template>
<script>
import ElementParamsInput from "element-params-input";

export default {
  name: "params",
  components: {
    ElementParamsInput: ElementParamsInput
  },
  data() {
    return {
      dialogVisible: false,
      test: "https://www.a.com?a=1&b=2&c=3&d=4"
    };
  },
  mounted() {}
};
</script>
