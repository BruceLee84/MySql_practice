const {Sequelize} = require('sequelize');


const db = new Sequelize("products", "root", "database", {
   host:"localhost",
   port:"3306",
   dialect:"mysql",
   // timezone:"+5:30",
})

module.exports = {db};  