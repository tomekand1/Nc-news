const commentsRouter = require('express').Router();
const { getCommentsByArticleId } = require('../controllers/comments');

commentsRouter.router('/').get(getCommentsByArticleId);

module.exports = commentsRouter;
