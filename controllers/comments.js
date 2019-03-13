const {
  allCommentsByArticleId,
  postNewCommentByArticleId,
  commentToBePached,
  commentToBeDeleted
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
  const body = req.body;
  delete Object.assign(body, {
    author: body.username
  }).username;
  const articleId = article_id
    ? {
        article_id: article_id
      }
    : {};
  delete Object.assign(body, {
    author: body.username
  }).username;

  const newComment = Object.assign(body, articleId);
  postNewCommentByArticleId(articleId, newComment).then(comment => {
    res.status(201).send({ comment });
  });
};

exports.patchCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  const { inc_votes } = req.body;

  commentToBePached(comment_id, inc_votes).then(pachedComment => {
    res.status(201).send({ pachedComment });
  });
};

exports.deleteCommentById = (req, res, next) => {
  const { comment_id } = req.params;

  commentToBeDeleted(comment_id).then(() => {
    res.sendStatus(204);
  });
};
