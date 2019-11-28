const jsonwebtoken = require('jsonwebtoken')
const secret = '12345678'
const op = {
    secret:'jwt_secret',
    key:'user'
}
const user = {
    name:'aa'
}
const token = jsonwebtoken.sign(
    {
        data:user,
       // exp:Math.floor(Date.now()/1000)+(-1*60)
        exp:Math.floor(Date.now()/1000)+(1*60)
    },
    secret
)

//过期时间 exp 必须设置对 过期就解析不出来拉 直接报错
console.log('生成的token:',token,Math.floor(Date.now()/1000)+(60*60))
console.log('解码:', jsonwebtoken.verify(token, secret, op))

//token进行服务端验证信息要进行数据的查询操作     
//JWT验证客户端发来的token信息就不用， 在服务端使用密钥校验就可以，不用数据库的查询