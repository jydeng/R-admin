/* 
  element-ui 日期范围快速选择项
*/
const dateShortcuts = [
  {
    text: "昨天",
    onClick(picker) {
      const end = new Date();
      const start = new Date();

      start.setTime(start.getTime() - 3600 * 1000 * 24);
      end.setTime(end.getTime() - 3600 * 1000 * 24);
      picker.$emit("pick", [start, end]);
    }
  },
  {
    text: "今天",
    onClick(picker) {
      const end = new Date();
      const start = new Date();

      picker.$emit("pick", [start, end]);
    }
  },
  {
    text: "最近一周",
    onClick(picker) {
      const end = new Date();
      const start = new Date();

      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      picker.$emit("pick", [start, end]);
    }
  },
  {
    text: "最近一个月",
    onClick(picker) {
      const end = new Date();
      const start = new Date();

      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      picker.$emit("pick", [start, end]);
    }
  },
  {
    text: "最近三个月",
    onClick(picker) {
      const end = new Date();
      const start = new Date();

      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
      picker.$emit("pick", [start, end]);
    }
  }
];

// 生成字段长度校验
const gLengthValidator = function(length, message) {
  return function(rule, value, callback) {
    if (value.length > length) {
      callback(new Error(message));
    } else {
      callback();
    }
  };
};

// 上限为当前时间
function now(date) {
  return date.getTime() > new Date().getTime();
}

export default { dateShortcuts, gLengthValidator, now };
