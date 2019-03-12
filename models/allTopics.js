const connection = require('../db/connection');

exports.allTopics = () =>
  connection
    .select('*')
    .from('topics')
    .returning('*');

exports.addTopic = topic => {
  return connection
    .insert(topic)
    .into('topics')
    .returning('*');
};
