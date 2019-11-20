const http = require('http')
const fs = require('fs')

const app = http.createServer((req, res) => {
    const { method, url } = req
    if (method == "GET" && url == "/"){
        fs.readFile('./index.html', (err, data) => {
            res.setHeader("Content-type","text/html")
            res.end(data)
        })
    } else if (method === "GET" && url === '/api/download') {
        fs.readFile("./file.txt", (err, data) => {
            res.setHeader("Content-type", "application/txt")
            const filename = encodeURI('中文')
            res.setHeader('Content-Disposition',`attachment;filename=${filename}.txt`)
            res.end(data)
        })
    }
})

app.listen(3000)