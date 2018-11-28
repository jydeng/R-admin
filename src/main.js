import "./style/theme.scss";
import "./style/index.scss";

import Vue from "vue";
import App from "./App.vue";

import createRouter from "./router";
import createStore from "./store";

import Element from "element-ui";

import R from "./components";
import Ajax from "./ajax";
import Filters from "./filters";
import Helper from "./helper";

// 生产环境不发出提示
Vue.config.productionTip = false;

// 引用elementUI
Vue.use(Element, { size: "small" });

// 引用自定义组件
Vue.use(R);

// 引用Ajax库
Vue.use(Ajax);

// 引用管道函数
Vue.use(Filters);

// 引用帮助函数
Vue.use(Helper);

export default () => {
  const router = createRouter();
  const store = createStore();

  /** 自动登录Begin **/

  // 从本地存储恢复状态,页面退出时将状态写入webStorage
  // const storageInfo = Vue.prototype.webStorageHelper.read("state");
  // // 判断状态是否有效
  // if (storageInfo && storageInfo["user"]) {
  //   store.dispatch("login", {
  //     user: {
  //       username: storageInfo.user.username,
  //       role: storageInfo.user.role
  //     }
  //   });
  //   store.dispatch("setmenu", storageInfo.menu);
  //   store.dispatch("changeThemeColor", storageInfo.themeColor);
  // }

  /** 自动登录End **/

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
      (menu === null ||
        menu.filter(p => p.url === currentRootPath).length === 0);

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

  const app = new Vue({
    router,
    store,
    render: h => h(App)
  });

  return { app, router };
};
