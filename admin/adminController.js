//express
const express = require('express');
const router = express.Router();

//Modles
const Admin = require('./Admin');
const User = require('../users/User');
const Buy = require('../buy/Buy');

//middleware
const navbar = require('../middlweres/navbar');
const adminAuth = require('../middlweres/admin')

//Hash
const bcrypt = require('bcryptjs');

router.get('/admin/users',adminAuth, (req, res) => {
    User.findAll().then((users) => {
        res.render('admin/admin/index', {users: users});
    })
})

router.get('/admin/login',navbar, (req, res) =>{
    res.render('admin/admin/login');
})

router.post('/admin/autheticate', (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    Admin.findOne({where: {email: email}}).then((admin) => {
        if(admin != undefined && admin != NaN && admin != null && admin != ''){
            if(bcrypt.compareSync(password, admin.password)){
                req.session.admin = {
                    id: admin.id,
                    name: admin.name,
                    email: admin.email
                }
                res.redirect('/admin/users');
            }else{
                res.redirect('/admin/login');
            }
        }else{
            res.redirect('/admin/login');
        }
    })
})



router.get('/admin/register',adminAuth, (req, res) => {
    res.render('admin/admin/register');
})

router.post('/admin/save', (req, res) =>{
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var password2 = req.body.password2;
    Admin.findOne({where: {email: email}}).then((admin) => {
        if(name != undefined && name != NaN && name != null && name != '' && email != undefined && email != NaN && email != null && email != '' && password != undefined && password != NaN && password != null && password != '' && password == password2){
            Admin.create({
                name: name,
                email: email,
                password: bcrypt.hashSync(password, 10)
            }).then(() => {
                res.redirect('/admin/login');
            })
        }else{
            res.redirect('/admin/register');
        }
    })
})

router.get('/admin/admin',adminAuth, (req, res) => {
    Admin.findAll().then((admins) => {
        res.render('admin/admin/adminList', {users: admins});
    })
})

router.post('/admin/deletarUser', (req, res) => {
    var id = req.body.id;
    Buy.destroy({
        where: {UserId: id}
    }).then(() => {
        User.destroy({
            where: {
                id: id
            }
        }).then(() => {
            res.redirect('/admin/users');
        })
    })  
})

router.post('/admin/deletarAdm', (req, res) => {
    var id = req.body.id;
    Admin.destroy({
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/admin/admin');
    }
    )
})

module.exports = router;