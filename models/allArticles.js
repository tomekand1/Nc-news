const connection = require('../db/connection');

exports.allArticles = (query, sort_by = 'created_at', order = 'desc') => connection
  .select('articles.*')
  .count({
    comment_count: 'comment_id',
  })
  .from('articles')
  .where(query)
  .orderBy(sort_by, order)
  .leftJoin('comments', 'comments.article_id', 'articles.article_id')
  .groupBy('articles.article_id');
exports.showArticleById = article_id => connection
  .select('*')
  .from('articles')
  .where(article_id);

exports.addArticle = newArticle => connection
  .insert(newArticle)
  .into('articles')
  .returning('*');

exports.patchArticleById = (article_id, inc_votes) => connection
  .select('*')
  .from('articles')
  .where({
    article_id,
  })
  .increment('votes', inc_votes)
  .returning('*');

exports.deleteArticleByIdAndAssociatedValues = article_id => connection('articles')
  .where({
    article_id,
  })
  .del();
