//express
const express = require('express')
const app = express()
const router = express.Router();

//flash
const flash = require('req-flash');
app.use(flash());


//Modles
const User = require('../users/User');

//middleware
const navbar = require('../middlweres/navbar');

//Hash
const bcrypt = require('bcryptjs');
const session = require('express-session');

//Rotas Http
router.get('/user/create',navbar, (req, res) => {
    res.render('admin/users/create');
})

router.post('/user/save',(req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    var password2 = req.body.password2;
    var name = req.body.name;
    
    User.findOne({where: {email: email}}).then((user) => {
        if(name != undefined && name != NaN && name != null && name != '' && email != undefined && email != NaN && email != null && email != '' && password != undefined && password != NaN && password != null && password != '' && password == password2){
            User.create({
                name: name,
                email: email,
                password: bcrypt.hashSync(password, 10)
            }).then(() => {
                res.redirect('/user/login');
            })
        }else{
            res.redirect('/user/create');
        }
    })
})

router.get('/user/login',navbar, (req, res) => {
    let flask = req.flash()
    let email = flask.errorMessage;
    res.render('admin/users/login', {email: email});
})

router.post('/user/authenticate', (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    User.findOne({where: {email: email}}).then((user) => {
        if(user != undefined && user != NaN && user != null && user != ''){
            if(bcrypt.compareSync(password, user.password)){
                req.session.user = {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
                res.redirect('/');
            }else{
                req.flash('successMessage', 'You are successfully using req-flash');
                req.flash('errorMessage', 'Senha invalida <a Href="/recuperaSenha">Recuperar senha</a>');
                res.redirect('/user/login');
            }
        }else{
            req.flash('successMessage', 'You are successfully using req-flash');
            req.flash('errorMessage', 'E-mail não encontrado');
            res.redirect('/user/login');
        }
    })
})

router.get('/user/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/user/login');
})

router.get('/user/edit',navbar, (req, res) => {
    let user = req.session.user;
    let flask = req.flash()
    let senha = flask.errorMessage;
    res.render('admin/users/edit', {senha: senha, user: user});
})

router.post('/editUser', (req, res) => {
    let name = req.body.name
    let email = req.body.email

    User.findOne({where: {email: email}}).then((user) => {
        user.update({
            name: name,
            email: email
        }).then(() => {
            req.flash('successMessage', 'You are successfully using req-flash');
            req.flash('errorMessage', 'Espere uns minutos para que a alteração seja efetuada');
            res.redirect('/user/edit');
        })
    })
})

router.post('/mudarsenha', (req, res) => {
    let password1 = req.body.password1;
    let password2 = req.body.password2;
    let email = req.body.email;
    console.log(email)
    if (password1 == password2){
        User.findOne({where: {email: email}}).then((user) => {
            if(user != undefined && user != NaN && user != null && user != ''){
                User.update({
                    password: bcrypt.hashSync(password1, 10)
                }, {
                    where: {
                        email: email
                    }
                }).then(() => {
                    req.session.destroy()
                    res.redirect('/user/login');
                })
            }else{
                req.flash('successMessage', 'You are successfully using req-flash');
                req.flash('errorMessage', 'Houver um error');
                res.redirect('/user/edit');
            }
        })
    }else{
        req.flash('successMessage', 'You are successfully using req-flash');
        req.flash('errorMessage', 'Senha nao sao iguais');
        res.redirect('/user/edit');
    }
})

router.get('/recuperaSenha', (req, res) => {
    res.render('admin/users/recuperaSenha');
})

router.post('/senhaNova', (req, res) => {
    var email = req.body.email;
    res.render('admin/users/senhaNova', {email: email});	
})

module.exports = router;