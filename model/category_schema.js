const {Sequelize, STRING} = require('sequelize');
const {db} = require('../middileware/mysql.config');

const catSchema = db.define('category', {
    id:{type:Sequelize.INTEGER, primaryKey:true, autoIncrement:true},
    adminId:{type:Sequelize.STRING, allowNull:false},
    image:{type:Sequelize.STRING, allowNull:false},
    category:{type:Sequelize.STRING, allowNull:false},

},{
    tableName: 'category',
    timestamps:true
})

catSchema.sync({force:false})

module.exports = catSchema;