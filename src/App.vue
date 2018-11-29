<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "App",
  methods: {
    ...mapActions(["login", "setmenu", "changeThemeColor"])
  },
  beforeMount() {
    // 尝试从webStorage还原vuex状态
    const state = this.webStorageHelper.read("state");
    if (state && state["user"] && state["user"]["username"]) {
      this.login({ user: state.user });
      this.setmenu(state.menu);
      this.changeThemeColor(state.themeColor);
      this.$router.go(-1);
    }
  },
  beforeDestroy() {
    // 将vuex状态写入webStorage
    this.webStorageHelper.write("state", this.$store.state);
  }
};
</script>
