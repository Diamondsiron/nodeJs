const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
    // webpack构建的入口 str | [] | obj
    //   entry: ["./src/index.js", "./src/other.js"],
    //   entry: "./src/index.js",
    //   entry: {
    //     main: "./src/index.js",
    //     other: "./src/other.js",
    //     testssss: "./src/test.js"
    //   },
    //! production生产模式
    mode:'development',
    output:{
        path:path.resolve(__dirname, './dist'),
        filename:'[name]_[chunkhash:8].js'
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            {
                test:'/\.png$/',
                use:{
                    loader:'file-loader',
                    options:{
                        name:"[name].[ext]"
                    }
                }
            }
        ]
    },
    devtool:'cheap-module-eval-source-map',
    plugins:[
        new htmlWebpackPlugin({
            title:'hello',
            template:'./index.html',
            filename:'zz.html'
        }),
        new CleanWebpackPlugin()
    ]
}
// spa单页面应用 mpa多页面应用
// Vue React
// SEO 搜索引擎优化， SEM搜索引擎营销 = 网站的排名，引流