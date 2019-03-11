const {
  articleData, topicData, userData, commentData,
} = require('../data');

const { dataToSql, newCommentsObj } = require('../utils/helperFunctions');

exports.seed = (knex, Promise) => knex.migrate.rollback()
  .then(() => knex.migrate.latest())
  .then(() => knex.insert(topicData).into('topics').returning('*'))
  .then(() => knex.insert(userData).into('users').returning('*'))
  .then(() => {
    const newArticleDate = dataToSql(articleData);
    return knex.insert(newArticleDate).into('articles').returning('*')
      .then(() => {
        const newCommentData = newCommentsObj(commentData);
        return knex.insert(newCommentData).into('comments');
      });
  });
