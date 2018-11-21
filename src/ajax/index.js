import $http from "./Axios";
import $jsonp from "./Jsonp";

export default {
  install: Vue => {
    Object.defineProperty(Vue.prototype, "$http", { value: $http });
    Object.defineProperty(Vue.prototype, "$jsonp", { value: $jsonp });
  }
};
