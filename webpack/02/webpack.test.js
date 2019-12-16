const proConfig = require("./webpack.pro");
const devConfig = require("./webpack.dev");
const baseConfig = require("./webpack.base");
const merge = require("webpack-merge");

console.log(process.env.NODE_ENV);

const isPro = process.env.NODE_ENV === "production";

module.exports = function() {
  if (isPro) {
    return merge(baseConfig, proConfig);
  } else {
    return merge(baseConfig, devConfig);
  }
};
