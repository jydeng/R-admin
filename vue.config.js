module.exports = {
  baseUrl: process.env.NODE_ENV === "production" ? "./" : "/",
  configureWebpack: () => {
    if (process.env.NODE_ENV === "production") {
      // 为生产环境修改配置
    } else {
      // 为开发环境修改配置
      return {
        devServer: {
          disableHostCheck: true,
          proxy: {
            // 为所有请求做代理
            "/api/*": {
              target: "http://localhost:8081",
              pathRewrite: { "^/api": "" },
              secure: false,
              changeOrigin: true
            }
          }
        }
      };
    }
  }
};
