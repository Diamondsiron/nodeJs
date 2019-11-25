const conf = require('./conf.js')
const {EventEmitter} = require('events')

const {MongoClient} = require('mongodb')

class Mongodb {
    constructor(conf){
        this.conf = conf
        this.emmiter = new EventEmitter()
        this.client = new MongoClient(conf.url, {
            useNewUrlParser:true
        })
        this.client.connect(err=>{
            if(err) throw err
            console.log("连接成功")
            this.emmiter.emit('connect')
        })
    }

    col(colName, dbName = conf.dbName) {
        return this.client.db(dbName).collection(colName)
    }
    once(event,cb) {
        this.emmiter.once(event,cb)
    }
}

module.exports = new Mongodb(conf)