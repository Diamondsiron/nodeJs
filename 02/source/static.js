const fs = require('fs')
const path = require('path')

module.exports = (dirPath = './public') => {
    return async (ctx, next) => {
        if (ctx.url.indexOf("/public") === 0) {
            const url = path.resolve(__dirname, dirPath)
            const fileBaseName = path.basename(url)
            const filePath = url + ctx.url.replace("/public", "")
            console.log(fileBaseName,filePath)
            try {
                stats = fs.statSync(filePath)
                console.log(stats,stats.isDirectory())
                if(stats.isDirectory()) {
                    const dir = fs.readdirSync(filePath)
                    const ret = ['<div style="padding-left:20px">']
                    dir.forEach(filename => {
                        console.log(filename)
                        // 简单认为不带小数点的格式，就是文件夹，实际应该用statSync
                        if (filename.indexOf('.') > -1) {
                            ret.push(
                                `<p><a style="color:black" href="${
                                    ctx.url
                                }/${filename}">${filename}</a></p>`  
                            )
                        } else {
                            ret.push(
                                `<p><a href="${ctx.url}/${filename}">${filename}</a></p>` 
                            )
                        }
                    })
                    ret.push("</div>")
                    ctx.body = ret.join("")
                    //ctx.body = "405"
                } else {
                    console.log("文件")

                    const content = fs.readFileSync(filePath)
                    ctx.body = content
                }
            } catch (error) {
                console.log(error)
                // 报错了 文件不存在
                ctx.body = "404"
            }
        } else {
            // 否则不是静态资源，直接去下一个中间件
            await next()
        }
    }
}