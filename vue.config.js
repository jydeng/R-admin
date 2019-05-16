const isProduction = process.env.NODE_ENV === "production";
// 外置依赖模块至cdn
const externals = {
  vue: "Vue",
  "vue-router": "VueRouter",
  vuex: "Vuex",
  axios: "axios",
  "element-ui": "ELEMENT",
  echarts: "echarts",
  wangeditor: "wangEditor",
  moment: "moment",
  Bideo: "Bideo",
  BMap: "BMap"
};
// 模块地址
const cdn = {
  dev: {
    css: [
      "https://cdn.bootcss.com/normalize/8.0.1/normalize.min.css",
      "https://cdn.bootcss.com/animate.css/3.7.0/animate.min.css",
      "https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css",
      "https://cdn.bootcss.com/element-ui/2.7.0/theme-chalk/index.css",
      "https://cdn.bootcss.com/wangEditor/3.1.1/wangEditor.min.css"
    ],
    js: [
      "https://cdn.bootcss.com/vue/2.6.10/vue.js",
      "https://cdn.bootcss.com/vue-router/3.0.2/vue-router.min.js",
      "https://cdn.bootcss.com/vuex/3.1.0/vuex.min.js",
      "https://cdn.bootcss.com/axios/0.18.0/axios.min.js",
      "https://cdn.bootcss.com/element-ui/2.7.0/index.js",
      "https://cdn.bootcss.com/echarts/4.2.1/echarts.min.js",
      "https://cdn.bootcss.com/wangEditor/3.1.1/wangEditor.min.js",
      "https://cdn.bootcss.com/moment.js/2.24.0/moment.min.js",
      "http://api.map.baidu.com/api?v=2.0&ak=9ZER5K6vvqcTQY6MHKDRCUKan5IFDEsO"
    ]
  },
  build: {
    css: [
      "https://cdn.bootcss.com/normalize/8.0.1/normalize.min.css",
      "https://cdn.bootcss.com/animate.css/3.7.0/animate.min.css",
      "https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css",
      "https://cdn.bootcss.com/element-ui/2.7.0/theme-chalk/index.css",
      "https://cdn.bootcss.com/wangEditor/3.1.1/wangEditor.min.css"
    ],
    js: [
      "https://cdn.bootcss.com/vue/2.6.10/vue.min.js",
      "https://cdn.bootcss.com/vue-router/3.0.2/vue-router.min.js",
      "https://cdn.bootcss.com/vuex/3.1.0/vuex.min.js",
      "https://cdn.bootcss.com/axios/0.18.0/axios.min.js",
      "https://cdn.bootcss.com/element-ui/2.7.0/index.js",
      "https://cdn.bootcss.com/echarts/4.2.1/echarts.min.js",
      "https://cdn.bootcss.com/wangEditor/3.1.1/wangEditor.min.js",
      "https://cdn.bootcss.com/moment.js/2.24.0/moment.min.js",
      "http://api.map.baidu.com/api?v=2.0&ak=9ZER5K6vvqcTQY6MHKDRCUKan5IFDEsO"
    ]
  }
};

module.exports = {
  publicPath: "./",
  configureWebpack: () => {
    if (!isProduction) {
      return {
        devServer: {
          disableHostCheck: true,
          proxy: {
            "/api/*": {
              target: "http://localhoost:8081",
              pathRewrite: { "^/api": "" },
              secure: false,
              changeOrigin: true
            }
          }
        },
        externals: externals
      };
    } else {
      return {
        externals: externals
      };
    }
  },
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      if (isProduction) {
        args[0].cdn = cdn.build;
      } else {
        args[0].cdn = cdn.dev;
      }
      return args;
    });
  }
};
