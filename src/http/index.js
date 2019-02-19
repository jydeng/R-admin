import $http from "./axios";
import $jsonp from "./jsonp";

export default {
  install: Vue => {
    Object.defineProperty(Vue.prototype, "$http", { value: $http });
    Object.defineProperty(Vue.prototype, "$jsonp", { value: $jsonp });
  }
};
