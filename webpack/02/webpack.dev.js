const htmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const path = require("path");
const baseConig = require("./webpack.base.js");
const merge = require("webpack-merge");
const AddAssetHtmlWebpackPlugin = require("add-asset-html-webpack-plugin")

const devConfig = {
  mode: "development",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "js/[name]_[hash:6].js"
  },
  devtool: "cheap-module-eval-source-map",

  devServer: {
    contentBase: path.resolve(__dirname, "./dist"),
    open: true,
    port: 8081,
    // hot: true,
    // hotOnly: true,
    proxy: {
      "/api": {
        target: "http://localhost:9092"
      }
    }
  },

  plugins: [
    new htmlWebpackPlugin({
      title: "京东商城",
      template: "./index.html",
      filename: "index.html"
    }),

    new webpack.HotModuleReplacementPlugin(),
    new AddAssetHtmlWebpackPlugin({
        filepath: path.resolve(__dirname, '../dll/react.dll.js') 
        // 对应的 dll路径
    }),
    new webpack.DllReferencePlugin({
        manifest: path.resolve(__dirname, './dll/reactmanifest.json')
    })
  ]
};

module.exports = merge(baseConig, devConfig);
