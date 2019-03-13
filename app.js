const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const api = require('./routes/api');

app.use(bodyParser.json());

app.use('/api', api);

app.all('/*', (req, res, next) => {
  res.status(404).send({ msg: 'Route not Found' });
});

//app.use(handle400)

module.exports = app;
