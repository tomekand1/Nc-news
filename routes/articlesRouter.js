const articleRouter = require('express').Router();

const {
  getCommentsByArticleId,
  postCommentByArticleId
} = require('../controllers/comments');

const {
  getArticles,
  postArticle,
  patchArticle,
  deleteArticleById,
  getArticleById
} = require('../controllers/articles');

articleRouter
  .route('/')
  .get(getArticles)
  .post(postArticle);

articleRouter
  .route('/:article_id/comments')
  .get(getCommentsByArticleId)
  .post(postCommentByArticleId);

articleRouter
  .route('/:article_id')
  .get(getArticleById)
  .patch(patchArticle)
  .delete(deleteArticleById);

module.exports = articleRouter;
