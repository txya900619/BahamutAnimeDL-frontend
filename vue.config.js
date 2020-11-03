module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "https://api.gamer.com.tw/mobile_app",
        pathRewrite: { "^/api": "" },
      },
    },
  },
};
