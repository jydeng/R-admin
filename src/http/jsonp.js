import jsonp from "jsonp";

/**
 * 生成jsonp Promise
 * @param {string} url 远程服务器地址
 * @param {object} params 查询参数
 */
export default (url, params) => {
  return new Promise((resolve, reject) => {
    jsonp(url, { param: params }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
