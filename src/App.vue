<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import store from "@/store";
export default {
  name: "App",
  methods: {
    beforeunloadHandler() {
      // F5刷新或者关闭页面前，把vuex存放的数据存放到storage
      if (store.state.user.token) {
        this.$storage.write("state", store.state);
      }
    }
  },
  mounted() {
    // 绑定事件
    window.addEventListener("beforeunload", () => this.beforeunloadHandler());
  },
  destroyed() {
    // 记得解绑，内存不会泄漏
    window.removeEventListener("beforeunload");
  }
};
</script>
