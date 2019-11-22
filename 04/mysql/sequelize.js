(
    async () => {
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
        //orm
        const Fruit = sequelize.define('Fruit',{
            name:{
                type:Sequelize.STRING(20),
                allowNull:false
            },
            price:{
                type:Sequelize.FLOAT,
                allowNull:false,
                validate:{
                    isFloat:{msg:'价格字段请输入数字'},
                    min:{args:[0],msg:'价格字段必须大于0'}
                }
            },
            stock:{
                type:Sequelize.INTEGER,
                defaultValue:0
            }
        },
        {
            timestamps:false,
            getterMethods:{
                amount(){
                    return this.getDataValue('stock') + 'kg'
                }
            },
            setterMethods:{
                amount(val){
                    const idx = val.indexOf('kg')
                    const v = val.slice(0,idx)
                    this.setDataValue('stock','v')
                }
            }
        }
        )

        Fruit.classify = function (name) {
            const tropicFruits = ['香蕉', '芒果', '椰子']; // 热带水果
            return tropicFruits.includes(name) ? '热带水果' : '其他水果';
        };
        Fruit.prototype.totalPrice = function (count) {
            return (this.price * count).toFixed(2);
        };
    
        ['香蕉', '草莓'].forEach(f => console.log(f + '是' + Fruit.classify(f)));
    
        // 同步数据库，force: true则会删除已存在表
        let ret = await Fruit.sync({ force: false })
        // console.log('sync', ret)
        ret = await Fruit.create({
            name: "香蕉",
            price: 3.5
        })

        const Op = Sequelize.Op;
        Fruit.findAll({
            // where: { price: { [Op.lt]:4 }, stock: { [Op.gte]: 100 } }
            where: { id: { [Op.lt]: 4, [Op.gt]: 2 } }
        }).then(fruits => {
            console.log(JSON.stringify(fruits))
            console.log(fruits.length);
        });





    }
)()