const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const api = require('./routes/api');

const { handle404, handle400, handle500 } = require('./errors');

app.use(bodyParser.json());

app.use('/api', api);

app.get('/*', handle404);

app.use(handle400);
app.use(handle500);

module.exports = app;
