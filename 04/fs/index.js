const fs = require('fs')
function get(key) {
    fs.readFile('./db.json',(err, data) => {
        if(!err){
            const json = JSON.parse(data)
            console.log(json)
        } else {
            console.log(err)
        }
    })
}
function set(key, value) {
    fs.readFile('./db.json',(err, data) => {
        console.log(key, value)
        const json = data ? JSON.parse(data) : {};
        json[key] = value
        console.log(json,JSON.stringify(json))
        fs.writeFile('./db.json',JSON.stringify(json), err=>{
            if(err){
                console.log("写入出错")
                console.log(err)
            }else {
                console.log("写入成功")
            }
        })
    })
}

//命令行接口
const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
rl.on('line', function(input){
    const [op, key, value] = input.split(" ")
    if (op === 'get') {
        get(key)
    } else if ( op === 'set') {
        set(key, value)
    } else if (op === 'quit') {
        rl.close()
    } else {
        console.log('nothing')
    }
})

rl.on('close',()=>{
    console.log('quit')
    process.exit(0)
})