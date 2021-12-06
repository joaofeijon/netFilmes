const sequelize = require('sequelize');
const connection = require('../database/database.js');
const Category = require('../categories/Category');

const Movie = connection.define('movie', {
    movie: {
        type: sequelize.STRING,
        allowNull: false
    },
    year: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    resumo: {
        type: sequelize.TEXT,
        allowNull: false
    },
    price: {
        type: sequelize.FLOAT,
        allowNull: false
    },
})

Category.hasMany(Movie)// N - 1, uma categoria para varios artigos

Movie.belongsTo(Category) // 1 - 1, um artigo pertence a uma categoria


//Movie.sync({force: true})

module.exports = Movie