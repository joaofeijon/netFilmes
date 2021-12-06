//express
const express = require('express');
const router = express.Router();

//Modles
const Movie = require('./Movie');
const Category = require('../categories/Category');

//middleware
const navbar = require('../middlweres/navbar');
const adminAuth = require('../middlweres/admin')
const userAuth = require('../middlweres/user')

//request
const request = require('request');
const { json } = require('body-parser');

router.get('/admin/adicionarFilme',adminAuth, (req, res) => {
    Category.findAll().then((categories) => {
        res.render('admin/movies/adicionarFilme', { categories: categories });
    })
})

router.post('/admin/createMovie', (req, res) => {
    var movie = req.body.movie;
    var year = req.body.year;
    var resumo = req.body.resumo;
    var image = req.body.image;
    var price = req.body.price;
    var category = req.body.category;
    
    if(movie != '' && year != '' && resumo != '' && price != ''){
        Movie.create({
            movie: movie,
            year: year,
            resumo: resumo,
            image: image,
            price: price,
            categoryId: category
        }).then(() => {
            res.redirect('/admin/filmes');
        }).catch((err) => {
            console.log(err);
        })
    }
   
})

router.get('/admin/filmes',adminAuth, (req, res) => {
    Movie.findAll().then((movies) => {
        res.render('admin/movies/filme.ejs', { movies: movies });
    })
})

router.get('/admin/filme/:slug', adminAuth, (req, res) => {
    var slug = req.params.slug;
    Category.findOne({
        where: {
            slug: slug
        }
    }).then((categories) => {
        Movie.findAll({
            where: {categoryId: categories.id}
        }).then((movies) => {
            res.render('admin/movies/filmeEscolhindo.ejs', { movies: movies, categories: categories });
        })
    })
})

router.get('/filmes/:id',navbar,userAuth, (req, res) => {
    var id = req.params.id;
    Movie.findOne({
        where: {
            id: id
        }
    }).then((movie) => {
        res.render('admin/movies/filmeEspecifico', { movie: movie });
    })
})

router.post('/busca',navbar, (req, res) => {
    var busca = req.body.busca;
    Movie.findAll({
        where: {movie: busca}
    }).then((movies) => {
        res.render('index', { movies: movies });
    })
})

module.exports = router;
