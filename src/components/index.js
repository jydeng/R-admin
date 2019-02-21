export default {
  install: Vue => {
    let contexts = require.context(".", true, /\.vue$/);

    contexts.keys().forEach(key => {
      let componentEntity = contexts(key).default;
      Vue.component(componentEntity.name, componentEntity);
    });
  }
};
