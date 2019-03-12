const { allTopics } = require('../models/allTopics');

exports.getTopics = (req, res, next) => {
  allTopics().then(topics => {
    res.status(200).send({ topics });
  });
};
