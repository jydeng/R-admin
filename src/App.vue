<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import store from "@/store";
export default {
  name: "App",
  methods: {
    beforeunloadHandler() {
      if (store.state.token) {
        this.$storage.write("state", store.state);
      }
    }
  },
  mounted() {
    window.addEventListener("beforeunload", () => this.beforeunloadHandler());
  },
  destroyed() {
    window.removeEventListener("beforeunload");
  }
};
</script>
