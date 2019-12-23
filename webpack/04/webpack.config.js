const path = require("path")
const CopyRightWebpackPlugin = require("./MyPlugins/copyright-webpack-plugin")
module.exports = {
    entry:"./src/index.js",
    mode:"development",
    output:{
        path:path.resolve(__dirname,"./dist"),
        filename:"main.js"
    },
    resolveLoader:{
        modules:["node_moudles","./MyLoaders"]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: path.resolve(__dirname, "./MyLoaders/ReplaceAsync.js")
            }
        ]
    },
    plugins:[
        new CopyRightWebpackPlugin({name:"hello"})
    ]
}