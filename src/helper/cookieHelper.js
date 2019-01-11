import Cookie from "js-cookie";

/**
 * 存储cookie值
 * @param {*} name
 * @param {*} value
 * @param {*} setting
 */
const set = (name, value, setting = {}) => {
  let defaultSetting = {
    expires: 1
  };
  Object.assign(defaultSetting, setting);
  Cookie.set(`veda-${name}`, value, defaultSetting);
};

/**
 * 获取cookie值
 * @param {*} name
 */
const get = name => {
  return Cookie.get(`veda-${name}`);
};

/**
 * 获取全部cookie
 */
const getAll = () => {
  return Cookie.get();
};

/**
 * 移除指定cookie
 * @param {*} name
 */
const remove = name => {
  return Cookie.remove(`veda-${name}`);
};

export default {
  set,
  get,
  getAll,
  remove
};
