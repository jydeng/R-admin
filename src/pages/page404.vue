<template>
  <div class="notFound">
    <img src="@/assets/404.gif" alt="404" />
    <!-- <p>Oh No~ 页面走丢了，或者你没有访问这个页面的权限！(〃'▽'〃)</p> -->
    <el-button type="primary" @click="goHome">回首页</el-button>
  </div>
</template>
<script>
export default {
  name: "page404",
  methods: {
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
