<template>
  <div class="notFound">
    <img src="@/assets/404.gif" alt="404" />
    <el-button type="primary" @click="goHome">
      <i class="fa fa-fw fa-home"></i> 回到首页
    </el-button>
  </div>
</template>

<script>
export default {
  name: "page404",
  methods: {
    /**
     *
     */
    goHome() {
      this.$router.push("/");
    }
  }
};
</script>

<style lang="scss" scoped>
.notFound {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;

  img {
    width: 100%;
  }

  p {
    text-align: center;
    color: #666;
    font-size: 13px;
  }
}
</style>
