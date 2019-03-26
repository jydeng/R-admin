import jsonp from "jsonp";

/**
 * 生成jsonp Promise
 * @param {string} url jsonp服务完整地址，自行拼接参数
 */
export default url => {
  return new Promise((resolve, reject) => {
    jsonp(url, {}, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
