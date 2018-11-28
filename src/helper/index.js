import elementHelper from "./elementHelper";
// import webStorageHelper from "./webStorageHelper";

export default {
  install: Vue => {
    Object.defineProperty(Vue.prototype, "elementHelper", {
      value: elementHelper
    });
    // Object.defineProperty(Vue.prototype, "webStorageHelper", {
    //   value: webStorageHelper
    // });
  }
};
