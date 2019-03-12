const connection = require('../db/connection');

exports.allTopics = () => connection.select('*').from('topics');

exports.addTopic = topic => connection
  .insert(topic)
  .into('topics')
  .returning('*');
