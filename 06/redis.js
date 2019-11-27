const redis = require('redis')
const client = redis.createClient(6379,'localhost')
client.set('a','a')
client.get('a',(err,o)=>{
    console.log(o)
})