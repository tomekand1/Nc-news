const api = require('express').Router();
const topicsRouter = require('./topicsRouter');
const articlesRouter = require('./articlesRouter');
const comentsRouter = require('./commentsRouter');
const usersRouter = require('./usersRouter');

const { getJson } = require('../controllers/apiJson');

api.route('/').get(getJson);

api.use('/topics', topicsRouter);
api.use('/articles', articlesRouter);
api.use('/comments', comentsRouter);
api.use('/users', usersRouter);

module.exports = api;
