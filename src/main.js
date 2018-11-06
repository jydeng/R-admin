import Vue from "vue";
import App from "./App.vue";

import router from "./router";
import store from "./store";

import Element from "element-ui";
import "./style/theme.scss";
import "./style/index.scss";
import Axios from "@/server";
import Jsonp from "@/server/jsonp";
import Filters from "@/filters";
import webStorage from "@/helpers/webStorageHelper";

// 生产环境不发出提示
Vue.config.productionTip = false;
// 引用elementUI
Vue.use(Element, { size: "small" });
// 引用Ajax库
Vue.use(Axios);
// 引用Jsonp库
Vue.use(Jsonp);
// 引用管道函数
Vue.use(Filters);

// 尝试从本地存储恢复状态
const storageInfo = webStorage.read("state");
// 本地存储的状态是否有效
const validInfo = storageInfo && storageInfo["user"];
if (validInfo) {
  store.dispatch("login", {
    user: {
      username: storageInfo.user.username,
      role: storageInfo.user.role
    }
  });
  store.dispatch("setmenu", storageInfo.menu);
  store.dispatch("changeThemeColor", storageInfo.themeColor);
}

// 全局路由守卫
// 身份验证 & 访问区域验证
router.beforeEach((to, form, next) => {
  // 排除路由，不做验证
  const excludeRoute = ["Login", "NoAuthority", "NotFound"];
  // 用户信息
  const user = store.state.user;
  // 菜单记录
  const menu = store.state.menu;
  // 用户信息是否过期
  const invalidUser = user == null || user.username === "";
  // 计算当前根路径，访问权限依据根路径进行判断
  const currentRootPath = /(\/[a-zA-Z]*)/.exec(to.path).pop();
  // 当前区域是否允许访问
  const notAllowAccess =
    currentRootPath !== "/Dashboard" &&
    (menu === null || menu.filter(p => p.url === currentRootPath).length === 0);

  if (!~excludeRoute.indexOf(to.name)) {
    if (invalidUser) {
      next("/Login");
    }

    if (notAllowAccess) {
      next("/NotFound");
    }
  }

  next();
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
