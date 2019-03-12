const api = require('express').Router();
const topicsRouter = require('./topicsRouter');
const articlesRouter = require('./articlesRouter');

api.get('/', (req, res) => {
  res.status(200).send('response api with ststus 200');
});
api.use('/topics', topicsRouter);

api.use('/articles', articlesRouter);

module.exports = api;
