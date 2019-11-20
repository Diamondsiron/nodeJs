const http = require('http')
const fs = require('fs')
const path = require('path')
const chunk = []
let size = 0
const serve = http.createServer((req, res) => {
    const {pathname} = require('url').parse(req.url)
    console.log(pathname,'pathname')
    if (pathname === '/upload') {
        console.log('upload...')
        
        const filename = req.headers['filename'] ? req.headers['file-name'] : 'abc.png'
        const outputFile = path.resolve(__dirname, filename)
        console.log(outputFile,'outputFile')
        const fis = fs.createWriteStream(outputFile)

        // //buffer写入 写入快 占运行内存
        // req.on('data', data => {
        //     chunk.push(data)
        //     size += data.length;
        //     console.log('data',data,size)
        // })

        // req.on('end',()=>{
        //     console.log('...end')
        //     const buffer = Buffer.concat(chunk, size)
        //     size = 0;
        //     fs.writeFileSync(outputFile,buffer)
        //     res.end()
        // })

        // //流时间写入
        // req.on('data',data=>{
        //     console.log('data',data)
        //     fis.write(data)
        // })

        // req.on('end',()=>{
        //     fis.end()
        //     res.end()
        // })

        req.pipe(fis)
        res.end()


    } else {
        const filename = pathname === '/' ? 'index.html' : pathname.substring(1)
        //const filename = 'index.html'

        var type = (function(_type) {
            switch(_type){
                case 'html' :
                case 'htm': return 'text/html charset=UTF-8'
                case 'js': return 'application/javascript charset=UTF-8'
                case 'css': return 'text/css charset=UTF-8'
                case 'txt': return 'text/plain charset=UTF-8'
                case 'manifest': return 'text/cache-manifest charset=UTF-8'
                default: return 'application/octet-stream'
            }
        }(filename.substring(filename.indexOf('.')+1)))
        // const content = fs.readFileSync(filePath)
        // ctx.body = content
        fs.readFile(filename, function(err, content) {
            if (err) { // 如果由于某些原因无法读取文件
                res.writeHead(404, { 'Content-type': 'text/plain charset=UTF-8' })
                res.write(err.message)
            } else { // 否则读取文件成功
                res.writeHead(200, { 'Content-type': type })
                res.write(content) // 把文件内容作为响应主体
            }
            res.end()
        })
    }
})
serve.listen(3000)