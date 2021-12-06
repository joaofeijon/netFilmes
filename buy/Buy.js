const sequelize = require('sequelize');
const Category = require('../categories/Category');
const db = require('../database/database');
const Movie = require('../movie/Movie')
const User = require('../users/User')

const Buy = db.define('buy', {
    Valor: {
        type: sequelize.DOUBLE,
        allowNull: false
    },
    Nome: {
        type: sequelize.STRING,
        allowNull: false
    },
    Sobrenome: {
        type: sequelize.STRING,
        allowNull: false
    },
    CPF: {
        type: sequelize.STRING,
        allowNull: false
    },
    Telefone: {
        type: sequelize.STRING,
        allowNull: false
    },
    Email: {
        type: sequelize.STRING,
        allowNull: false
    },
    CEP: {
        type: sequelize.STRING,
        allowNull: false
    },
    Endereco: {
        type: sequelize.STRING,
        allowNull: false
    },
    Numero: {
        type: sequelize.STRING,
        allowNull: false
    },
    Complemento: {
        type: sequelize.STRING,
        allowNull: true
    },
    Bairro: {
        type: sequelize.STRING,
        allowNull: false
    },
    Cidade: {
        type: sequelize.STRING,
        allowNull: false
    },
    Estado: {
        type: sequelize.STRING,
        allowNull: false
    },
    FormaPagamento: {
        type: sequelize.STRING,
        allowNull: false
    },
    MovieId: {
        type: sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Movie,
            key: 'id'
        }
    },
    UserId: {
        type: sequelize.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    }
});



//Buy.sync({force: true});



module.exports = Buy;