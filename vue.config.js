module.exports = {
  baseUrl: process.env.NODE_ENV === "production" ? "./" : "/",
  configureWebpack: () => {
    if (!process.env.NODE_ENV === "production") {
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
        }
      };
    }
  }
};
