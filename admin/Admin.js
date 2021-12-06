const sequelize = require('sequelize');
const connection = require('../database/database.js');

const Admin = connection.define('admin', {
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

//Admin.sync({force: false})

module.exports = Admin
