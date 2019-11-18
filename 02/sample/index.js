const Koa = require('koa')
const app = new Koa()
//中间件正序执行
app.use(async (ctx, next) => {
    const start = Date.now()
    console.log(`start:${ctx.url}`)
    await next()
    const end = Date.now()
    console.log(`请求${ctx.url},耗时${parseInt(end-start)}ms`)
})
app.use(require('koa-static')(__dirname + '/'))
const router = require('koa-router')()
router.get('/string', async (ctx, next) => {
    ctx.body = "koa string"
})
router.get('/json', async (ctx, next) => {
    ctx.body = {
        title : 'koa josn'
    }
})
app.use(router.routes())
app.listen(3000)
