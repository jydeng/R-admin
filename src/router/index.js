import Vue from "vue";
import Router from "vue-router";
import RouterConfig from "./modules";
import CommonRouters from "./common";
import store from "@/store";

Vue.use(Router);

let router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: RouterConfig.concat(CommonRouters)
});

router.beforeEach((to, from, next) => {
  // 是否登录校验
  if (to.meta.requiresAuth) {
    if (store.state.user.token) {
      next();
    } else {
      next({
        path: "/login",
        query: {
          redirect: to.fullPath
        }
      });
    }
  } else {
    next();
  }
});

export default router;
