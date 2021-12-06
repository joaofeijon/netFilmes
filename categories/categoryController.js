//express
const express = require('express');
const router = express.Router();

//Modles
const Admin = require('../admin/Admin');
const User = require('../users/User');
const Category = require('./Category');

//middleware
const navbar = require('../middlweres/navbar');
const adminAuth = require('../middlweres/admin')

//Hash
const bcrypt = require('bcryptjs');

//slugify
const slugify = require('slugify')

router.get('/admin/category',adminAuth, (req, res) => {
    Category.findAll().then((categories) => {
        res.render('admin/category/index', {categories: categories})
    })
})
 
router.get('/admin/category/new',adminAuth, (req, res) => {
    res.render('admin/category/new')
})

router.post('/admin/categories/save', (req, res) => {
    let title = req.body.name;
    Category.create({
        title: title,
        slug: slugify(title)
    }).then(() => {
        res.redirect('/admin/category')
    })
})

module.exports = router;