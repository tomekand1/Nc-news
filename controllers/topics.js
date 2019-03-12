const { allTopics, addTopic } = require('../models/allTopics');

exports.getTopics = (req, res, next) => {
  allTopics().then((topics) => {
    res.status(200).send({ topics });
  });
};

exports.postTopic = (req, res, next) => {
  const topic = req.body;
  addTopic(topic).then((insertedtopic) => {
    res.status(201).send({ insertedtopic });
  });
};
