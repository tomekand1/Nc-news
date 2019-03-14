const api = require('express').Router();
const topicsRouter = require('./topicsRouter');
const articlesRouter = require('./articlesRouter');
const comentsRouter = require('./commentsRouter');
const usersRouter = require('./usersRouter');

api.get('/', (req, res) => {
  res.status(200).send('response api with ststus 200');
});
api.use('/topics', topicsRouter);

api.use('/articles', articlesRouter);

api.use('/comments', comentsRouter);

api.use('/users', usersRouter);

module.exports = api;
