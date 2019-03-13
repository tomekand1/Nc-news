const connection = require('../db/connection');
exports.allCommentsByArticleId = articleId => {
  return connection
    .select('*')
    .from('comments')
    .where(articleId);
};

exports.postNewCommentByArticleId = articleId => {
  console.log(articleId);
};
