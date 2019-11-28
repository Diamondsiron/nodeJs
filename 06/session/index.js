const Koa = require('koa')
const router = require('koa-router')()
const session = require('koa-session')
const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')
const static = require('koa-static')

const app = new Koa()
app.use(cors({
    credentials:true
}))
app.keys = ['some secrte'];

app.use(static(__dirname + '/'))
app.use(bodyParser())
app.use(session(app))

app.use((ctx, next) => {
    if(ctx.url.indexOf('login') > -1 || ctx.url.indexOf('logout') > -1) {
        next()
    } else {
        if(!ctx.session.userinfo){
            ctx.body = {
                message:'没登录'
            }
        } else {
            next()
        }
    }
})

router.post('/login', async (ctx) => {
    const { body } = ctx.request;
    
    ctx.session.userinfo = body.username;
    ctx.body = {
        message:'d登陆成功'
    }
})

router.post('/logout', async(ctx) => {
    delete ctx.session.userinfo
    ctx.body = {
        message:'logout'
    }
})
router.get('/getUser', async (ctx) => {
    ctx.body = {
        message: "获取数据成功",
        userinfo: ctx.session.userinfo
    }
})
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(3000);