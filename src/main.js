import "./style/index.scss";

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

// 初始化vue实例
const entity = new Vue({
  router,
  store,
  render: h => h(App)
});

// 手动挂载到#app
entity.$mount("#app");
