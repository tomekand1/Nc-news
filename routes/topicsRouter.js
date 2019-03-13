const topicsRouter = require('express').Router();

const { getTopics, postTopic } = require('../controllers/topics');

topicsRouter
  .route('/')
  .get(getTopics)
  .post(postTopic)
  .all((req, res) => {
    res.status(405).send({ msg: 'Method not allowed' });
  });

module.exports = topicsRouter;
