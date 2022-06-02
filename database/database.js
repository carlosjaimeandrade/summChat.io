const Sequelize = require('sequelize')

//configurando o timesoze
const connection = new Sequelize('summons', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    timesoze: '-03:00'
})

module.exports = connection;