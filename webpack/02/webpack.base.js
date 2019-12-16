const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const miniCssExtractPlugin = require("mini-css-extract-plugin");
//HappyPack对仅js友好
const  HappyPack = require('happypack')
const os = require('os');
const HappyPackThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

module.exports = {
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.css$/,
        include: path.resolve(__dirname, "./src"),
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.png$/,
        include: path.resolve(__dirname, "./src"),
        use: {
          loader: "file-loader",
          options: {
            name: "images/[name].[ext]"
          }
        }
      },
      {
        test: /\.less$/,
        include: path.resolve(__dirname, "./src"),
        // exclude:"./node_modules",
        use: [
          miniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "less-loader"
        ]
      },
      {
        test: /\.js$/,
        include: path.resolve(__dirname, "./src"),
        exclude: /node_modules/,
        use:[
            {
                loader:"happypack/loader?id=happyBabel"
            }
        ]
      }
    ]
  },
  

  plugins: [
    new CleanWebpackPlugin(),
    new miniCssExtractPlugin({
      filename: "css/[name]_[contenthash:6].css"
    }),
    new HappyPack({
        id:'happyBabel',
        // 如何处理.js，Loader配置中⼀样
        loaders:['babel-loader?cacheDirectory'],
        threadPool: HappyPackThreadPool,
    })
  ]
};
