import moment from "moment";

/**
 * 判断数据类型
 * @param {*} obj 对象
 */
function typeOf(obj) {
  const toString = Object.prototype.toString;
  const map = {
    "[object Boolean]": "boolean",
    "[object Number]": "number",
    "[object String]": "string",
    "[object Function]": "function",
    "[object Array]": "array",
    "[object Date]": "date",
    "[object RegExp]": "regExp",
    "[object Undefined]": "undefined",
    "[object Null]": "null",
    "[object Object]": "object"
  };
  return map[toString.call(obj)];
}

/**
 * deepCopy
 * @param {*} data 对象
 */
function deepCopy(data) {
  const t = typeOf(data);
  let o;

  if (t === "array") {
    o = [];
  } else if (t === "object") {
    o = {};
  } else {
    return data;
  }

  if (t === "array") {
    for (let i = 0; i < data.length; i++) {
      o.push(deepCopy(data[i]));
    }
  } else if (t === "object") {
    for (let i in data) {
      o[i] = deepCopy(data[i]);
    }
  }
  return o;
}

/**
 * 生成uuid
 * @param {*} len 位数
 */
function uuid(len = 32) {
  const $chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  const maxPos = $chars.length;
  let str = "";
  for (let i = 0; i < len; i++) {
    str += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return str;
}

// 将promise async化
function to(promise) {
  if (!promise || !Promise.prototype.isPrototypeOf(promise)) {
    return new Promise((resolve, reject) => {
      reject(new Error("requires promises as the param."));
    }).catch(err => {
      return [err, null];
    });
  }
  return promise
    .then(function() {
      return [null, ...arguments];
    })
    .catch(err => {
      return [err, null];
    });
}

/**
 * 计算百分比
 * @param {*} part 子项
 * @param {*} whole 总数
 * @param {*} digit 小数
 */
function percentage(part, whole, digit = 2) {
  if (parseFloat(part) > 0 && parseFloat(whole) > 0) {
    return `${((parseFloat(part) / parseFloat(whole)) * 100).toFixed(digit)}%`;
  } else {
    return `0%`;
  }
}

/**
 * 计算平均值
 * @param {*} part 子项
 * @param {*} whole 总数
 * @param {*} digit 小书
 */
function avg(part, whole, digit = 2) {
  if (parseFloat(part) > 0 && parseFloat(whole) > 0) {
    return `${(parseFloat(whole) / parseFloat(part)).toFixed(digit)}`;
  } else {
    return `0.00`;
  }
}

/**
 * 格式化数字
 * @param {*} num 数字
 * @param {*} digit 小数
 */
function parseNum(num, digit = 2) {
  if (num) {
    return parseFloat(num).toFixed(digit);
  } else {
    return 0;
  }
}

/**
 * 获取后几天的日期
 * @param {*} days 天数
 * @param {*} format 格式
 */
function fewDays(days, format = "YYYY-MM-DD") {
  return moment()
    .add(days, "days")
    .format(format);
}

/**
 * 转化code
 * @param {*} code code
 * @param {*} dist 字典
 * @param {*} miss 未命中则呈现
 * @param {*} k 自定义key
 * @param {*} v 自定义value
 */
function transCode(code, dist, miss = "未匹配", k = "key", v = "value") {
  if (dist.length === 0 || !code) {
    return miss;
  }

  let item = dist.find(t => t[k].toString() === code.toString());

  if (item) {
    return item[v];
  } else {
    return miss;
  }
}

/**
 * Animate.CSS封装（已Promise化）
 * @param {*} element dom或者查询字符串
 * @param {*} animationName 动画类
 */
function animateCSS(element, animationName) {
  return new Promise(resolve => {
    let node;
    // 判断是否是dom
    if (typeOf(element) === "string") {
      node = document.querySelector(element);
    } else {
      node = element;
    }
    node.classList.add("animated", animationName);
    node.addEventListener("animationend", handleAnimationEnd);
    function handleAnimationEnd() {
      node.classList.remove("animated", animationName);
      node.removeEventListener("animationend", handleAnimationEnd);
      resolve();
    }
  });
}

export default {
  typeOf,
  deepCopy,
  uuid,
  to,
  percentage,
  avg,
  parseNum,
  fewDays,
  transCode,
  animateCSS
};
