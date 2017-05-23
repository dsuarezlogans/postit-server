const bodyParser = require('body-parser');
const express = require('express');
const volleyball = require('volleyball');

const config = require('./config');
const api = require('./routes');

const User = require('./models/users');
const Location = require('./models/locations');
const Country = require('./models/country');

const app = express();

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(volleyball);

app.get('/', (req, res) => {
  res.status(200).send({
    message: 'Hello World!',
    status: true
  });
});

app.use('/api', api);

app.listen(config.PORT, () => {

  console.log('localhost server running on port:', config.PORT);

  config.DB_CONN.sync({
      force: true
    })
    .then(() => console.log('Database connected'))
    .catch();
});
