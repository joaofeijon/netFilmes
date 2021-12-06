const Sequelize = require('sequelize')
const connection = require('../database/database.js')

const Category = connection.define('categories', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

//Category.sync({force: true})// roda so uma vez

module.exports = Category