const mysql = require('mysql')

const cfg = {
    host:'localhost',
    user:'root',
    password:'123456',
    database:'app'
}

const conn = mysql.createConnection(cfg)

conn.connect(err=>{
    if (err) {
        throw err
    } else {
        console.log('连接成功！')
    }
})

const CREATE_SQL = `CREATE TABLE IF NOT EXISTS test(
    id INT NOT NULL AUTO_INCREMENT,
    message VARCHAR(45) NULL,
    PRIMARY KEY(id)
)`

const INSERT_SQL = `INSERT INTO test(message) VALUES(?)`
const SELECT_SQL = `SELECT * FROM test`
//回调地狱的写法
conn.query(CREATE_SQL,err=>{
    if(err){
        throw err
    }
    conn.query(INSERT_SQL,'hello,world',(err, result)=>{
        if(err) {
            throw err
        }
        conn.query(SELECT_SQL, (err, results) => {
            console.log(results)
            conn.end()
        })
    })
})