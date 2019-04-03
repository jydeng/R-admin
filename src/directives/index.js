import store from "@/store";

export default {
  install: Vue => {
    // 管理员权限
    Vue.directive("admin", {
      bind: function(el) {
        if (!store.getters["common/admin"]) {
          el.innerHTML = "";
        }
      }
    });
  }
};
