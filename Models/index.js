// const dbConfig = require("../Config/db");
// const Sequelize = require("sequelize");
// const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
//   host: dbConfig.HOST,
//   dialect: dbConfig.dialect,
//   operatorsAliases: 0,
//   define: {
//     "timestamps": false
//   },
//   logging:true, 
//   pool: {
//     max: dbConfig.pool.max,
//     min: dbConfig.pool.min,
//     acquire: dbConfig.pool.acquire,
//     idle: dbConfig.pool.idle
//   }
// });
// const db = {};
// db.Sequelize = Sequelize;
// db.user = require("./user")(sequelize,Sequelize);
// db.post = require("./post")(sequelize,Sequelize);
// module.exports = db;

// const Sequelize = require('sequelize')

// const db = new Sequelize({
//     database:'my_db',
//     username:'viraj',
//     password:'viraj123',
//     dialect:'mysql'
// })

// const User = db.define('user',{
//     email:{
//         type:Sequelize.STRING,
//          allowNull:false
//     },
//     name:{
//         type:Sequelize.STRING,
//         allowNull:false
//     },
//     password:{
//         type:Sequelize.STRING,
//         allowNull:false
//     }
// })