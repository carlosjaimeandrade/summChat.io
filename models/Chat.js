const Sequelize = require('sequelize')
const connection = require('../database/database')
const User = require('./User')

const Chat = connection.define('chat', {
    codigo: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

Chat.belongsTo(User)

/* Chat.sync({ force: true }) */

module.exports = Chat;