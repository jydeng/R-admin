import Vue from "vue";
import Router from "vue-router";
import store from "@/store";
import storage from "@/shared/storage";
import RouterConfig from "./modules";
import CommonRouters from "./common";

Vue.use(Router);

// 从storage中恢复登录信息
let state = storage.read("state");

if (state && state["token"]) {
  store.dispatch("login", {
    user: { username: state.user.username, role: state.user.role },
    token: state.token
  });
}

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: RouterConfig.concat(CommonRouters)
});
