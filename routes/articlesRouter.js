const articleRouter = require('express').Router();

const {
  getArticles,
  postArticle,
  patchArticle,
} = require('../controllers/articles');

articleRouter
  .route('/')
  .get(getArticles)
  .post(postArticle);

articleRouter.route('/:article_id')
  .patch(patchArticle);

module.exports = articleRouter;