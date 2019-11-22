(async () => {
    //一对多
    const Sequelize = require("sequelize")
    const sequelize = new Sequelize(
        'app',
        'root',
        '123456',
        {
            host: "localhost",
            dialect: "mysql",
            operatorsAliases: false
        }
    )
    const Player = sequelize.define('player', { name: Sequelize.STRING });
    const Team = sequelize.define('team', { name: Sequelize.STRING });
    Player.belongsTo(Team); // 1端建立关系
    Team.hasMany(Player); // N端建立关系    

    // 同步数据库，force: true则会删除已存在表
    sequelize.sync({ force: true }).then(async () => {
        await Team.create({ name: '中国' });
        await Player.bulkCreate([{ name: '姚明', teamId: 1 }, { name: '刘玮', teamId: 1 }]);
        await Team.create({ name: '西班牙' });
        await Player.bulkCreate([{ name: '大加索尔', teamId: 2 }, { name: '小加索尔', teamId: 2 }]);
        // 1端关联查询  
        const players = await Player.findAll({ include: [Team] });
        console.log(JSON.stringify(players, null, 2));

        // N端关联查询
        const team = await Team.findOne({ where: { name: '中国' }, include: [Player] });
        console.log(JSON.stringify(team, null, 2));
    });


})(

)