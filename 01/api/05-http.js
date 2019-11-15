const http = require('http')
const fs = require('fs')
const server = http.createServer((request, response) => {
    const {url, method, headers} = request
    console.log(request)
    
    if (url === '/' && method === 'GET') {
        fs.readFile('index.html',(err,data) => {
            response.statusCode = 200
            response.setHeader('Context-type','text/html')
            response.end(data)
        })
    } else if (url === '/users' && method === 'GET') {
        response.writeHead(200,{
            'Context-type': 'application/json'
        })
        response.end(JSON.stringify({
            date:'20191115'
        }))
    } else if (method === 'GET' && headers.accept.indexOf('image/*') !== -1) {
        //TODO 开放加载图片后有favicon.ico找不到的问题
        fs.createReadStream('./'+url).pipe(response)
    } else {
        response.statusCode = 404
        response.setHeader('Content-Type', 'text/plain;charset=utf-8')
        response.end('404, 页面没有找到')
    }
})

server.listen(3000)