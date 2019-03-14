const connection = require('../db/connection');

exports.allCommentsByArticleId = (
  articleId,
  sort_by = 'created_at',
  order = 'desc',
) => connection
  .select('*')
  .from('comments')
  .where(articleId)
  .orderBy(sort_by, order);

exports.postNewCommentByArticleId = (articleId, newComment) => connection
  .insert(newComment)
  .into('comments')
  .where(articleId)
  .returning('*');

exports.commentToBePached = (comment_id, inc_votes) => connection
  .select('*')
  .from('comments')
  .where({
    comment_id,
  })
  .increment('votes', inc_votes)
  .returning('*');
exports.commentToBeDeleted = comment_id => connection('comments')
  .where({
    comment_id,
  })
  .del();
