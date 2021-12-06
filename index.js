//Express
const express = require('express');
const app = express();
const port = 8080;

//express-session
const session = require('express-session');
app.use(session({
    secret: 'test',
    cookie: {maxAge: 600000}
}))

//flash
const flash = require('req-flash');
app.use(flash());

//middleware
const navbar = require('./middlweres/navbar');

//Body Parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//database
const connection = require('./database/database');
connection.authenticate().then(() => {console.log('Conecato com sucesso ao banco de dados');}).catch(err => {console.error('Erro ao ser conectar no banco de dados: ', err);});

//modles 
const User = require('./users/User');
const Admin = require('./admin/Admin');
const Movie = require('./Movie/Movie');
const Category = require('./categories/Category');
const Buy = require('./buy/Buy');

//ejs
app.set('view engine', 'ejs');

//static files
app.use(express.static('public'));


//Routes http
//http user
const user = require('./users/userController')
app.use('/', user);

//http admin
const admin = require('./admin/adminController')
app.use('/', admin);

//http movie
const movie = require('./Movie/movieController')
app.use('/', movie);

//http category
const category = require('./categories/categoryController')
app.use('/', category);

//http buy
const buy = require('./buy/buyController')
app.use('/', buy);

app.get('/',navbar, (req, res) => {
    Movie.findAll().then((movies) => {
        res.render('index', {movies: movies});
    })
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));