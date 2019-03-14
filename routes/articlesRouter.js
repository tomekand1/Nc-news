const articleRouter = require('express').Router();

const {
  getCommentsByArticleId,
  postCommentByArticleId,
} = require('../controllers/comments');
const { handle405 } = require('../errors');
const {
  getArticles,
  postArticle,
  patchArticle,
  deleteArticleById,
  getArticleById,
} = require('../controllers/articles');

articleRouter
  .route('/')
  .get(getArticles)
  .post(postArticle)
  .all(handle405);

articleRouter
  .route('/:article_id/comments')
  .get(getCommentsByArticleId)
  .post(postCommentByArticleId)
  .all(handle405);

articleRouter
  .route('/:article_id')
  .get(getArticleById)
  .patch(patchArticle)
  .delete(deleteArticleById)
  .all(handle405);

module.exports = articleRouter;
