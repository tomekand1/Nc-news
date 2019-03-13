const connection = require('../db/connection');
exports.allCommentsByArticleId = articleId => {
  return connection
    .select('*')
    .from('comments')
    .where(articleId);
};

exports.postNewCommentByArticleId = (articleId, newComment) => {
  return connection
    .insert(newComment)
    .into('comments')
    .where(articleId)
    .returning('*');
};

exports.commentToBePached = (comment_id, inc_votes) => {
  return connection
    .select('*')
    .from('comments')
    .where({
      comment_id: comment_id
    })
    .increment('votes', inc_votes)
    .returning('*');
};
exports.commentToBeDeleted = comment_id => {
  return connection
    .select('*')
    .from('comments')
    .where({
      comment_id: comment_id
    })
    .del();
};
