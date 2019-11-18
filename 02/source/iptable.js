module.exports = async function (ctx, next) {
    const {res, req} = ctx
    const blackList = ['127.0.0.1']
    const ip = getIp(req)
    if (blackList.includes(id)){
        ctx.body = "no allowed"
    } else {
        await next()
    }
}

function getIp(req) {
    return (
    req.headers["x-forwarded-for"] || // 判断是否有反向代理 IP
    req.connection.remoteAddress || // 判断 connection 的远程 IP
    req.socket.remoteAddress || // 判断后端的 socket 的 IP
    req.connection.socket.remoteAddress
     );
}