(
    async () => {
        const mysql = require('mysql2/promise')
        const cfg = {
            host:'localhost',
            user:'root',
            password:'123456',
            database:'app'
        }
        //异步写法解决回调地狱
        const connection = await mysql.createConnection(cfg)
        let ret = await connection.execute(`
            CREATE TABLE IF NOT EXISTS test (
                id INT NOT NULL AUTO_INCREMENT,
                message VARCHAR(45) NULL,
            PRIMARY KEY (id))
        `)
        console.log('create', ret)

        ret = await connection.execute(`
                INSERT INTO test(message)
                VALUES(?)
        `, ['ABC'])
        console.log('insert:', ret)


        ret = await connection.execute(`
                SELECT * FROM test
        `)
        console.log(JSON.stringify(ret[0]))
        // console.log(ret[1])

        connection.end()
        }
)()