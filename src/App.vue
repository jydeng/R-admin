<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: "App",
  mounted() {
    // window.addEventListener("unload", () => {
    //   // 页面退出时，保存状态到 webStorage
    //   this.webStorageHelper.write("state", this.$store.state);
    // });
  }
};
</script>
