const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const api = require('./routes/api');

const {
  handle404, handle400, handle500, handle422,
} = require('./errors');

app.use(bodyParser.json());

app.use('/api', api);

app.use('/*', (req, res, next) => {
  next({ status: 404 });
});
app.use(handle404);
app.use(handle422);
app.use(handle400);
app.use(handle500);

module.exports = app;
