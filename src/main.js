import "./style/theme.scss";
import "./style/index.scss";

import Vue from "vue";
import App from "./App.vue";

import router from "./router";
import store from "./store";

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
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  });

  return { app, router };
};
