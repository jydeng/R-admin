import "normalize.css";
import "font-awesome/css/font-awesome.min.css";
import "./style/theme.scss";
import "./style/index.scss";

import Vue from "vue";
import App from "./App.vue";

import router from "./router";
import store from "./store";

import Element from "element-ui";

import R from "./components";
import Http from "./http";
import Filter from "./filter";
import Directive from "./directive";
import Shared from "./shared";

// 生产环境不发出提示
Vue.config.productionTip = false;

// 引用elementUI
Vue.use(Element, { size: "small" });

// 引用自定义组件
Vue.use(R);

// 引用Ajax库
Vue.use(Http);

// 引用自定义管道函数
Vue.use(Filter);

// 引用自定义指令函数
Vue.use(Directive);

// 引用公共函数
Vue.use(Shared);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
