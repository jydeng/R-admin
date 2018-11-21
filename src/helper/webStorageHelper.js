/**
 * 写入缓存
 * @param {string} key
 * @param {any} value
 * @returns {boolean} result
 */
const write = (key, value) => {
  try {
    window.sessionStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * 读取缓存
 * @param {string} key
 * @returns {any} result
 */
const read = key => {
  try {
    const value = window.sessionStorage.getItem(key);

    return value ? JSON.parse(value) : null;
  } catch (error) {
    return false;
  }
};

/**
 * 删除缓存
 * @param {string} key
 * @returns {boolean} result
 */
const remove = key => {
  try {
    window.sessionStorage.removeItem(key);
    return true;
  } catch (error) {
    return false;
  }
};

export default { write, read, remove };
