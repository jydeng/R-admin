import elementHelper from "./elementHelper";
import webStorageHelper from "./webStorageHelper";
import cookieHelper from "./cookieHelper";
import randomStr from "./randomStr";

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
    Object.defineProperty(Vue.prototype, "$randomStr", {
      value: randomStr
    });
  }
};
