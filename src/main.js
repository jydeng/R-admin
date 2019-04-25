import "./style/index.scss";
import "nprogress/nprogress.css";

import Vue from "vue";
import App from "./App.vue";

import router from "./router";
import store from "./store";

import element from "element-ui";

import components from "./components";
import http from "./http";
import filters from "./filters";
import directives from "./directives";
import shared from "./shared";
import storage from "./shared/storage";

// 生产环境不发出提示
Vue.config.productionTip = false;

// 引用elementUI
Vue.use(element, { size: "small" });

// 引用自定义组件
Vue.use(components);

// 引用Ajax库
Vue.use(http);

// 引用自定义管道函数
Vue.use(filters);

// 引用自定义指令函数
Vue.use(directives);

// 引用公共函数
Vue.use(shared);

// 从storage中恢复登录信息，要在vue实例初始化之前进行
let state = storage.read("state");
if (state && state["user"] && state.user["token"]) {
  store.dispatch("user/login", {
    user: {
      username: state.user.user.username,
      role: state.user.user.role
    },
    token: state.user.token
  });
  // 恢复成功立刻删除，避免信息泄露
  storage.remove("state");
}

// 初始化vue实例
const entity = new Vue({
  router,
  store,
  render: h => h(App)
});

// 手动挂载到#app
entity.$mount("#app");
