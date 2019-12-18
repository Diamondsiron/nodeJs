const path = require("path");
const htmlwebpackplugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const glob = require("glob");

// {
//   index:"./pages/index/index.js",
//   list:"./pages/list/index.js"
// }

// new htmlwebpackplugin({
//   template:"",
//   filename:
//   chunks
// })
const setMpa = () => {
  const entry = {};
  const htmlwebpackplugins = [];

  const entryFiles = glob.sync(path.join(__dirname, "./pages/*/index.js"));

  entryFiles.map((item, index) => {
    const entryFile = entryFiles[index];
    const match = entryFile.match(/pages\/(.*)\/index\.js$/);
    console.log(match);
    const pageName = match && match[1];
    entry[pageName] = entryFile;

    htmlwebpackplugins.push(
      new htmlwebpackplugin({
        template: path.join(__dirname, `pages/${pageName}/index.html`),
        filename: `${pageName}.html`,
        chunks: [pageName]
      })
    );
  });

  return {
    entry,
    htmlwebpackplugins
  };
};

const { entry, htmlwebpackplugins } = setMpa();

module.exports = {
  entry: entry,
  mode: "production",
  watch: true,
  watchOptions: {
    //默认为空，不监听的文件或者目录，支持正则
    ignored: /node_modules/,
    //监听到文件变化后，等300ms再去执行，默认300ms,
    aggregateTimeout: 300,
    //判断文件是否发生变化是通过不停的询问系统指定文件有没有变化，默认每秒问1次
    poll: 1000 //ms
  },
  output: {
    path: path.resolve(__dirname, "./mpa"),
    filename: "[name].js"
  },
  plugins: [...htmlwebpackplugins, new CleanWebpackPlugin()]
};
