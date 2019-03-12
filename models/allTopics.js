const connection = require('../db/connection');

exports.allTopics = () => connection
  .select('*')
  .from('topics')
  .returning('*');
