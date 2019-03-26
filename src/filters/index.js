export default {
  install: Vue => {
    // 格式化数字
    Vue.filter("parseNum", function(value, digit = 2) {
      if (value) {
        return parseFloat(value).toFixed(digit);
      } else {
        return 0.0;
      }
    });
  }
};
