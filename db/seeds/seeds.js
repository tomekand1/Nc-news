const { articleData, topicData, userData, commentData } = require('../data');

const {
  dataToSql,
  newCommentsObj,
  articleId,
} = require('../utils/helperFunctions');

exports.seed = (knex, Promise) =>
  knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() =>
      knex
        .insert(topicData)
        .into('topics')
        .returning('*')
    )
    .then(() =>
      knex
        .insert(userData)
        .into('users')
        .returning('*')
    )
    .then(() => {
      const newArticleDate = dataToSql(articleData);
      return knex
        .insert(newArticleDate)
        .into('articles')
        .returning('*')
        .then(article => {
          const articleTitleId = articleId(article);
          const newCommentData = newCommentsObj(commentData, articleTitleId);
          return knex.insert(newCommentData).into('comments');
        });
    });
