var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)

const ip = '192.168.84.225'
const port = 3000

app.get('/',(req, res) => {
    res.sendFile(__dirname, '/index.html')
})

app.get('/auth/login/:id', (req, res) => {
    // 认证id
    // io[req.params.id]
    // io.send('success', '登录成功');
    res.end('ok')
})

io.on('connection', socket=>{
    socket.emit('qcorde',`http://${ip}:${port}/auth/login/${socket.id}`)
    socket.on('disconnect',function(){
        console.log('lost')
    })
})
http.listen(port, ip, ()=>{
    console.log('ok')
})