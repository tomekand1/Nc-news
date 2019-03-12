const articleRouter = require('express').Router();

const { getArticles, postArticle } = require('../controllers/articles');

articleRouter
  .route('/')
  .get(getArticles)
  .post(postArticle);

module.exports = articleRouter;
