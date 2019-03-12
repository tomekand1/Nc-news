const { allArticles } = require('../models/allArticles');
exports.getArticles = (req, res, next) => {
  allArticles().then(articles => {
    res.status(200).send({ articles });
  });
};
