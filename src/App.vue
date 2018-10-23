<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import webStorage from "@/helpers/webStorageHelper";
export default {
  name: "App",
  mounted() {
    // 页面退出时，保存状态到webStorage
    window.addEventListener("unload", this.saveState);
  },
  methods: {
    // 保存状态
    saveState() {
      webStorage.write("state", this.$store.state);
    }
  }
};
</script>
