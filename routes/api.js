const api = require('express').Router();
const topicsRouter = require('./topicsRouter');

api.get('/', (req, res) => {
  res.status(200).send('response from status 200');
});
api.use('/topics', topicsRouter);

module.exports = api;
