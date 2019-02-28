<template>
  <el-container class="wrapper">
    <el-header>
      <layoutHeader></layoutHeader>
    </el-header>
    <el-container>
      <layoutAside></layoutAside>
      <layoutMain></layoutMain>
    </el-container>
  </el-container>
</template>

<script>
import layoutHeader from "@/layout/layoutHeader";
import layoutAside from "@/layout/layoutAside";
import layoutMain from "@/layout/layoutMain";

export default {
  name: "home",
  components: {
    layoutHeader: layoutHeader,
    layoutAside: layoutAside,
    layoutMain: layoutMain
  }
};
</script>

<style lang="scss" scoped>
// 最外层
.wrapper {
  position: absolute;
  height: 100%;
  width: 100%;

  .el-header {
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
    background: #fff;
  }
}
</style>
