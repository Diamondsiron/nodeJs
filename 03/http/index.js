const api = require('./api')
const proxy = require('./proxy')
api.listen(4000)
proxy.listen(3000)
//跨域问题
//浏览器同源策略
//解决办法
//1.res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
//2.clent传输特殊header  会先走option 再走get 服务器端 res.setHeader('Access-Control-Allow-Credentials', 'true');
//3.反向单例 nginx或者http-proxy-middleware
//4.axios.defaults.withCredentials = true 带上cookie信息