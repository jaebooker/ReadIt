const dotenv = require('dotenv').config();
var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const express = require('express')
const app = express()
app.use(cookieParser());

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const posts = require('./controllers/posts')(app);
const db = require('./data/reddit-db');
const comments = require('./controllers/comments')(app);
const users = require('./controllers/auth')(app);
mongoose.connect('mongodb://localhost/reddit-clone');
app.use(bodyParser.urlencoded({ extended: true }));
var exphbs = require('express-handlebars');

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.use(methodOverride('_method'))
app.set('view engine', 'handlebars');

module.exports = app;
