const Sequelize = require('sequelize')

const connection = new Sequelize('netfilme', 'root', 'Jo08012007',{
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection