// 启用状态
const statusAction = value => {
  switch (value) {
    case "2":
      return "启用";

    default:
      return "停用";
  }
};

// 审核状态
const mtStatus = value => {
  switch (value) {
    case "2":
      return "审核通过";
    case "3":
      return "审核拒绝";
  }
  return "待审核";
};

export default {
  install: Vue => {
    Vue.filter("statusAction", statusAction);
    Vue.filter("mtStatus", mtStatus);
  }
};
