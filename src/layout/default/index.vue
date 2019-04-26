<template>
  <el-container class="wrapper">
    <el-header>
      <iHeader></iHeader>
    </el-header>
    <el-container>
      <iAside></iAside>
      <iMain></iMain>
    </el-container>
  </el-container>
</template>

<script>
import iHeader from "./header";
import iAside from "./aside";
import iMain from "./main";

export default {
  name: "home",
  components: {
    iHeader,
    iAside,
    iMain
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/mixin.scss";
.wrapper {
  position: absolute;
  height: 100%;
  width: 100%;

  .el-header {
    @include shadow;
    background: #fff;
    padding-left: 0;
  }
}
</style>
