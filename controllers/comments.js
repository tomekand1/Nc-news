const {
  allCommentsByArticleId,
  postNewCommentByArticleId,
  commentToBePached,
  commentToBeDeleted
} = require('../models/allComments');

exports.getCommentsByArticleId = (req, res, next) => {
  const { sort_by, order } = req.query;

  const article_id = req.params;

  allCommentsByArticleId(article_id, sort_by, order)
    .then(comments => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

exports.postCommentByArticleId = (req, res, next) => {
  const article_id = req.params;
  const body = req.body;
  delete Object.assign(body, {
    author: body.username
  }).username;

  const newComment = Object.assign(body, article_id);
  postNewCommentByArticleId(article_id, newComment)
    .then(comment => {
      res.status(201).send({ comment });
    })
    .catch(next);
};

exports.patchCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  const { inc_votes } = req.body;

  commentToBePached(comment_id, inc_votes)
    .then(pachedComment => {
      res.status(201).send({ pachedComment });
    })
    .catch(next);
};

exports.deleteCommentById = (req, res, next) => {
  const { comment_id } = req.params;

  commentToBeDeleted(comment_id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(next);
};
