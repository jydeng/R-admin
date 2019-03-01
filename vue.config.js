const production = process.env.NODE_ENV === "production";
module.exports = {
  publicPath: production ? "./" : "/",
  configureWebpack: () => {
    if (!production) {
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
