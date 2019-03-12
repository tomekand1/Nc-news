const connection = require('../db/connection');

exports.allArticles = (query, sort_by = 'created_at', order = 'desc') => connection
  .select('articles.*')
  .count({
    comment_count: 'comment_id'
  })
  .from('articles')
  .where(query)
  .orderBy(sort_by, order)
  .leftJoin('comments', 'comments.article_id', 'articles.article_id')
  .groupBy('articles.article_id');

exports.addArticle = newArticle => connection
  .insert(newArticle)
  .into('articles')
  .returning('*');

exports.patchArticleById = (articleId, incVotes) => connection.select('*').from('articles').where({
  article_id: articleId
})