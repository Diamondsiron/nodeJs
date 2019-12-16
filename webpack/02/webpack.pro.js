const htmlWebpackPlugin = require("html-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const merge = require("webpack-merge");
const baseConig = require("./webpack.base.js");
const path = require("path");
const PurifyCSS = require("purifycss-webpack");
const glob = require("glob-all");
const proConfig = {
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "js/[name]_[hash:6].js"
  },
  mode: "production",
  optimization:{
    //帮我们⾃动做代码分割
    splitChunks:{
    chunks:"all",//默认是⽀持异步，我们使⽤all
    } 
  },
  plugins: [
    new htmlWebpackPlugin({
      title: "京东商城",
      template: "./index.html",
      filename: "index.html",
      minify: {
        // 压缩HTML文件
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: true, // 删除空白符与换行符
        minifyCSS: true // 压缩内联css
      }
    }),
    new PurifyCSS({
      paths: glob.sync([
        // 要做 CSS Tree Shaking 的路径文件
        path.resolve(__dirname, "./src/*.html"), // 请注意，我们同样需要对 html 文件进行 tree shaking
        path.resolve(__dirname, "./src/*.js")
      ])
    }),
    new OptimizeCSSAssetsPlugin({
      cssProcessor: require("cssnano"), //引入cssnano配置压缩选项
      cssProcessorOptions: {
        discardComments: { removeAll: true }
      }
    })
  ]
};

module.exports = merge(baseConig, proConfig);
