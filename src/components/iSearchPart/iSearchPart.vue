<template>
  <el-row class="searchPart" :gutter="10">
    <slot></slot>
  </el-row>
</template>
<script>
export default {
  name: "iSearchPart"
};
</script>
<style lang="scss">
.searchPart {
  padding: 10px 0;

  // 强制el-date、el-select铺满
  .el-date-editor,
  .el-select {
    width: 100% !important;
  }
}
</style>
