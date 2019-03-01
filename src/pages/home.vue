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
import layoutHeader from "@/layout/default/layoutHeader";
import layoutAside from "@/layout/default/layoutAside";
import layoutMain from "@/layout/default/layoutMain";

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
@import "../style/mixin.scss";
// 最外层
.wrapper {
  position: absolute;
  height: 100%;
  width: 100%;

  .el-header {
    @include shadow;
    background: #fff;
  }
}
</style>
