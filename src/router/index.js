import Vue from "vue";
import Router from "vue-router";
import RouterConfig from "./modules";
import CommonRouters from "./common";

Vue.use(Router);

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: RouterConfig.concat(CommonRouters)
});
