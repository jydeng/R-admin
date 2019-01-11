import elementHelper from "./elementHelper";
import webStorageHelper from "./webStorageHelper";
import cookieHelper from "./cookieHelper";

export default {
  install: Vue => {
    Object.defineProperty(Vue.prototype, "elementHelper", {
      value: elementHelper
    });
    Object.defineProperty(Vue.prototype, "webStorageHelper", {
      value: webStorageHelper
    });
    Object.defineProperty(Vue.prototype, "cookieHelper", {
      value: cookieHelper
    });
  }
};
