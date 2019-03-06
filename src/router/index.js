import Vue from "vue";
import Router from "vue-router";
import store from "@/store";
import storage from "@/shared/storage";
import RouterConfig from "./modules";
import CommonRouters from "./common";

Vue.use(Router);

// 尝试从storage中恢复登录信息
let state = storage.read("state");
if (state && state["common"]["token"]) {
  store.dispatch("common/login", {
    user: {
      username: state.common.user.username,
      role: state.common.user.role
    },
    token: state.common.token
  });
}

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: RouterConfig.concat(CommonRouters)
});
