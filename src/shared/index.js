import element from "./element";
import storage from "./storage";
import cookie from "./cookie";
import uuid from "./uuid";

export default {
  install: Vue => {
    Object.defineProperty(Vue.prototype, "$element", {
      value: element
    });
    Object.defineProperty(Vue.prototype, "$storage", {
      value: storage
    });
    Object.defineProperty(Vue.prototype, "$cookie", {
      value: cookie
    });
    Object.defineProperty(Vue.prototype, "$uuid", {
      value: uuid
    });
  }
};
