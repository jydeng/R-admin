export default {
  // Vue.use 自动调用 install
  install: Vue => {
    // require.context 获取所有 *.vue 结尾的文件
    let contexts = require.context(".", true, /\.vue$/);

    // 循环注册全局组件
    contexts.keys().forEach(key => {
      let entity = contexts(key).default;
      if (entity.name) {
        // 沿用组件的name
        Vue.component(entity.name, entity);
      } else {
        console.error(`${key}.vue 注册失败，因为没有name属性。`);
      }
    });
  }
};
