const Sequelize = require('sequelize')

const connection = new Sequelize('netfilme', 'root', 'senha',{
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection
