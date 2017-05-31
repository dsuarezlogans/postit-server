'use strict';

const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const favicon = require('serve-favicon');
const hbs = require('express-handlebars');
const path = require('path');
const volleyball = require('volleyball');


const config = require('./config');
const api = require('./routes');

const app = express();

app.use('/public', express.static(path.join(__dirname,'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(volleyball);
app.use(cors());

app.engine('.hbs', hbs({
  defaultLayout: 'default',
  extname: '.hbs'
}));
app.set('view engine', '.hbs');

app.get('/', function (req, res) {
  res.render('home');
});

app.get('/add', function (req, res) {
    res.render('add-user');
});

app.use('/api', api);

config.DB_CONN.sync({
    force: true
  })
  .then(() => {
    console.log('Database connected');
    app.listen(config.PORT, () => {
      console.log('localhost server running on port:', config.PORT);
    });
}).catch();
