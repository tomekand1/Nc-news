const connection = require('../db/connection');

exports.allArticles = () => {
  return connection
    .select('*')
    .from('articles')
    .returning('*');
};
