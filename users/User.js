const sequelize = require('sequelize')
const connection = require('../database/database.js')

const User = connection.define('user', {
    name: {
        type: sequelize.STRING,
        allowNull: false
    },
    email: {
        type: sequelize.STRING,
        allowNull: false
    },
    password: {
        type: sequelize.STRING,
        allowNull: false
    }
})

//User.sync({force: false})

module.exports = User