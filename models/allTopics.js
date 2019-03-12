const connection = require('../db/connection');
exports.allTopics = () => {
  return connection
    .select('*')
    .from('topics')
    .returning('*');
};
