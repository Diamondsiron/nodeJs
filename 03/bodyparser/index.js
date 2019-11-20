const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')

const router = require('koa-router')()
//app.use(bodyParser())
//body { abc: '123', def: '456' }
app.use(require('koa-static')(__dirname + '/'))

app.use(async (ctx, next) => {
    console.log('body ....')
    const req = ctx.request.req
    let reqData = []
    let size = 0
    await new Promise((reslove, reject) => {
        req.on('data', data => {
            console.log('on',data)
            reqData.push(data)
            size += data.length;
        })
        req.on('end',()=>{
            console.log('end')
            const data = Buffer.concat(reqData, size)
             //ody abc=123&def=456
            ctx.request.body = data.toString()
            reslove()
        })
    })
    await next()
})

router.post('/add', async (ctx, next) => {
    console.log('body', ctx.request.body)
    ctx.body = ctx.request.body
    next()
})

app.use(router.routes())
app.listen(3000)