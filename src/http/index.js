export default {
  install: Vue => {
    let contexts = require.context(".", false, /\.js$/);

    contexts.keys().forEach(key => {
      if (key === "./index.js") return;

      let auxName = `$${/\w+/.exec(key).pop()}`;
      let auxEntity = contexts(key).default;

      Object.defineProperty(Vue.prototype, auxName, { value: auxEntity });
    });
  }
};
