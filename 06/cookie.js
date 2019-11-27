const http = require('http')
const app = http.createServer((req, res) => {
    const sessionKey = 'a'
    if(req.url === '/favicon.ico'){
        console.log('cookie1')
        return
    }else{
        const cookie = req.headers.cookie
        console.log(cookie,4)
        if(req.headers.cookie){
            // 简略写法未必具有通用性
            const pattern = new RegExp(`${sessionKey}=([^;]+);?\s*`)
            const sid = pattern.exec(cookie)[1]
            console.log('cookie2')
            res.end("wanne")
        }else{
            console.log('cookie3')
            res.setHeader('Set-Cookie',`${sessionKey}=a`)
            res.end('hello cookie')
    
        }
    }  
   
})
app.listen(3000)