const { allTopics, addTopic } = require('../models/allTopics');

exports.getTopics = (req, res, next) => {
  allTopics()
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch(next);
};

exports.postTopic = (req, res, next) => {
  const topic = req.body;
  addTopic(topic)
    .then(([topic]) => {
      res.status(201).send({ topic });
    })
    .catch(next);
};
