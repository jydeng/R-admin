<template>
  <el-container class="wrapper">
    <el-header></el-header>
    <el-container>
      <layoutAside></layoutAside>
      <layoutMain></layoutMain>
    </el-container>
  </el-container>
</template>

<script>
// import layoutHeader from "@/layout/layoutHeader";
import layoutAside from "@/layout/layoutAside";
import layoutMain from "@/layout/layoutMain";

export default {
  name: "home",
  components: {
    // layoutHeader: layoutHeader,
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
}
</style>
