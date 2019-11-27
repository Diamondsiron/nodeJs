const Koa = require('koa')
const session = require('koa-session')
const redisStore = require('koa-redis')
const redis = require('redis')
const wrapper = require('co-redis')

const app = new Koa()
const redisClient = redis.createClient(6379, 'localhost')
const client = wrapper(redisClient)

app.keys = ['mySceret']

const SESS_CONFIG = {
    key:'white:sess',
    // maxAge: 8640000, // 有效期
    // httpOnly: true, // 服务器有效
    // signed: true // 签名
    store:redisStore({client})
}

app.use(session(SESS_CONFIG,app))

app.use(ctx => {
    redisClient.keys('*',(err, keys) => {
        keys.forEach(key => {
            redisClient.get(key, (err, val)=>{
                console.log(val)
            })
        })
    })
    if (ctx.path === '/favicon.ico') return
    let n = ctx.session.count || 0
    ctx.session.count = ++n
    ctx.body = `第${n}次访问`
})
app.listen(3000)