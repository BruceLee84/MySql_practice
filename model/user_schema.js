const {Sequelize} = require('sequelize');
const {db} = require('../middileware/mysql.config'); 

const crypto = require('crypto')

const userShema = db.define('user_table',{
    id:{type:Sequelize.INTEGER, primaryKey:true, autoIncrement:true},
    Name:{type:Sequelize.STRING, allowNull:false},
    Email:{type:Sequelize.STRING, allowNull:false},
    Password:{type:Sequelize.STRING, allowNull:false},
    Mobile:{type:Sequelize.BIGINT,  allowNull:false},
    role:{type:Sequelize.STRING, enum:('admin','user') , allowNull:false, defaultValue:'user'},
    active:{type:Sequelize.BOOLEAN, allowNull:true, defaultValue:false},
    loginStatus:{type:Sequelize.BOOLEAN, allowNull:true, defaultValue:false},
    lastvisted:{type:Sequelize.STRING, allowNull:true}

},{
    tableName : 'user_table',
    // freezeTableName:true,
    timestamps:true,

})

userShema.sync({force:false});

module.exports = userShema;