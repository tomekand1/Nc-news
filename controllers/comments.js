const {
  allCommentsByArticleId,
  postNewCommentByArticleId
} = require('../models/allComments');

exports.getCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const articleId = article_id
    ? {
        article_id: article_id
      }
    : {};
  allCommentsByArticleId(articleId).then(comments => {
    res.status(200).send({ comments });
  });
};

exports.postCommentByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const articleId = article_id
    ? {
        article_id: article_id
      }
    : {};
  postNewCommentByArticleId(articleId);
};
