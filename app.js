const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const api = require('./routes/api');

app.use(bodyParser.json());

app.use('/api', api);

module.exports = app;
