import moment from "moment";

// 数据类型
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

// deepCopy
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

// uuid
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

// 包装promsie,为async服务
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

// 计算百分比
function percentage(part, whole, digit = 2) {
  if (parseFloat(part) > 0 && parseFloat(whole) > 0) {
    return `${((parseFloat(part) / parseFloat(whole)) * 100).toFixed(digit)}%`;
  } else {
    return `0%`;
  }
}

// 计算平均值
function avg(part, whole, digit = 2) {
  if (parseFloat(part) > 0 && parseFloat(whole) > 0) {
    return `${(parseFloat(whole) / parseFloat(part)).toFixed(digit)}`;
  } else {
    return `0.00`;
  }
}

// 格式化数字
function parseNum(num, digit = 2) {
  if (num) {
    return parseFloat(num).toFixed(digit);
  } else {
    return 0;
  }
}

// 日期格式化
function fewDays(days, format = "YYYY-MM-DD") {
  return moment()
    .add(days, "days")
    .format(format);
}

// 翻译code
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

export default {
  typeOf,
  deepCopy,
  uuid,
  to,
  percentage,
  avg,
  parseNum,
  fewDays,
  transCode
};
