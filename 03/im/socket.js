const net = require('net')
const chatServer = net.createServer()
const clientList = []
chatServer.on('connection',client => {
    client.write('hi!\n')
    clientList.push(client)
    client.on('data',data=>{
        console.log('receive',data.toString())
        clientList.forEach(v=>{
            v.write(data)
        })
    })
})
//tel 127.0.0.1 3000
//curl -v https://www.baidu.com

chatServer.listen(3000)