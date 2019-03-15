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
    .then(([comment]) => {
      res.status(200).send({ comment });
    })
    .catch(next);
};

exports.patchCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  const { inc_votes } = req.body;

  const votes = typeof inc_votes === 'number' ? inc_votes : 0;

  commentToBePached(comment_id, votes)
    .then(([pachedComment]) => {
      res.status(200).send({ pachedComment });
    })
    .catch(next);
};

exports.deleteCommentById = (req, res, next) => {
  const { comment_id } = req.params;

  commentToBeDeleted(comment_id)
    .then(result => {
      result === 0 ? next({ status: 404 }) : res.sendStatus(204);
    })
    .catch(next);
};
