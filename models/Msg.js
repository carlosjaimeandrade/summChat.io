const Sequelize = require('sequelize')
const connection = require('../database/database')
const Chat = require('./Chat')
const User = require('./User')

const Msg = connection.define('msg', {
    msg: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    view:{
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
})

Chat.hasMany(Msg)
User.hasMany(Msg)


/* Msg.sync({ force: true }) */

module.exports = Msg;