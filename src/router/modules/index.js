const files = require.context(".", true, /\.js$/); // 创建包含.js文件的上下文

let configRouters = [];

files.keys().forEach(key => {
  if (key === "./index.js") return;
  configRouters = configRouters.concat(files(key).default); // 读取出文件中的default模块
});

export default configRouters;
