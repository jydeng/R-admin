import store from "@/store";
export default {
  install: Vue => {
    // 自动获得焦点
    Vue.directive("focus", {
      inserted: function(el) {
        el.focus();
      }
    });

    // 仅管理员访问
    Vue.directive("admin", {
      bind: function(el) {
        if (!store.getters.admin) {
          el.parentElement.removeChild(el);
        }
      }
    });
  }
};
