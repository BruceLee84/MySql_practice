const {Sequelize} = require('sequelize');
const {db} = require('../middileware/mysql.config');

const product = db.define('product', {
    id:{type:Sequelize.INTEGER, primaryKey:true, autoIncrement:true},
    Name:{type:Sequelize.STRING, allowNull:false},
    price:{type:Sequelize.INTEGER, allowNull:false},
    image:{type:Sequelize.STRING, allowNull:false},
    Framecolor:{type:Sequelize.STRING, allowNull:false},
    quantity:{type:Sequelize.INTEGER, allowNull:false},
    categoryname:{type:Sequelize.STRING, allowNull:false},
    categoryId:{type:Sequelize.INTEGER, allowNull:false},
    adminId:{type:Sequelize.INTEGER, allowNull:false}
},
{
    tableName:'product',
    timestamps:true
})

product.sync({force:false})

module.exports=product;

