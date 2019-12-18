/** @desc 静态公共资源打包配置
*/
const path = require('path')
const {DllPlugin} = require('webpack')
const NODE_ENV = process.env.NODE_ENV;
module.exports = {
    mode: NODE_ENV,
    entry: ["react","react-dom"],
    output: {
        path: path.resolve(__dirname, "./dll"),
        filename: 'react.dll.js',
        library: 'react',
    },
    plugins: [
        new DllPlugin({
            // manifest.json⽂件的输出位置
           //生成manifest.json文件，并指定他的输出位置
            path: path.join(__dirname, "./dll", "[name]manifest.json"),
            name: "react" //!name要和library的名称一致
        })
    ]
}