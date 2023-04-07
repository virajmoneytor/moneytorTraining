
module.exports = {
    HOST:'localhost',
    USER : 'viraj',
    PASSWORD : 'viraj123',
    DB:'my_db',
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
}