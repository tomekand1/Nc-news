const topicsRouter = require('express').Router();
const { getTopics } = require('../controllers/getTopics');

topicsRouter.get('/', getTopics);

module.exports = topicsRouter;
