//express
var express = require('express');
var router = express.Router();


//models
var Buy = require('./Buy');
var User = require('../users/User');
const Movie = require('../movie/Movie');

//middleware
var navbar = require('../middlweres/navbar');

router.post("/buy/compra",navbar, (req, res) => {
    var id_filme = req.body.id//id do filme
    var id_usario =  req.session.user.id
    User.findOne({
        where: {id: id_usario}
    }).then((user) => {
        Movie.findOne({
            where: {id: id_filme}
        }).then((movie) => {
            res.render('admin/buy/buy', { user: user, movie: movie });
        })
    })
})

router.post('/buy/auth', (req, res) => {
    var nome = req.body.nome
    var sobrenome = req.body.sobrenome
    var cpf = req.body.cpf
    var telefone = req.body.telefone
    var email = req.body.email
    var cep = req.body.cep
    var endereco = req.body.endereco
    var numero = req.body.numero
    var complemento = req.body.complemento
    var bairro = req.body.bairro
    var cidade = req.body.cidade
    var estado = req.body.estado
    var formaPagamento = req.body.formaPagamento
    var id_filme = req.body.id_movie
    var id_user = req.body.id_user
    var valor = req.body.valor
    if(nome != '' || sobrenome != '' || cpf != '' || telefone != '' || email != '' || cep != '' || endereco != '' || numero != '' || complemento != '' || bairro != '' || cidade != '' || estado != '' || id_filme != '' || id_user != '' || nome != NaN || sobrenome != NaN || cpf != NaN || telefone != NaN || email != NaN || cep != NaN || endereco != NaN || numero != NaN || complemento != NaN || bairro != NaN || cidade != NaN || estado != NaN || id_filme != NaN || id_user != NaN || nome == undefined || sobrenome == undefined || cpf == undefined || telefone == undefined || email == undefined || cep == undefined || endereco == undefined || numero == undefined || complemento == undefined || bairro == undefined || cidade == undefined || estado == undefined || id_filme == undefined || id_user == undefined || nome == null || sobrenome == null || cpf == null || telefone == null || email == null || cep == null || endereco == null || numero == null || complemento == null || bairro == null || cidade == null || estado == null || id_filme == null || id_user == null)   {
        Buy.create ({
            Valor: valor,
            Nome: nome,
            Sobrenome: sobrenome,
            CPF: cpf,
            Telefone: telefone,
            Email: email,
            CEP: cep,
            Endereco: endereco,
            Numero: numero,
            Complemento: complemento,
            Bairro: bairro,
            Cidade: cidade,
            Estado: estado,
            FormaPagamento:  formaPagamento,
            MovieId: id_filme,
            UserId: id_user
        }).then(() => {
            res.redirect('/buy/movies')
        })
    }else{
        res.redirect('/buy/compra')
    }

})

router.get('/buy/movies',navbar, (req, res) => {
    var id_user = req.session.user.id
    let movies = []
    Buy.findAll({
        where: {UserId: id_user}
    }).then((buy) => {
        if(buy == '' || buy == null){
            res.render('admin/buy/naoFilmes')
        }else{
        buy.forEach((x) => {
            Movie.findOne({
                where: {id: x.MovieId}
            }).then((movie) => {
                movies.push(movie)
                if(movies.length == buy.length){
                    res.render('admin/buy/movieBuy', {movies: movies})
                }
            })
        })
    }})
})

router.get('/buy/erro',navbar, (req, res) => {
    res.render('admin/buy/final')
})

module.exports = router;