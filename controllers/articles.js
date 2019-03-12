const {
  allArticles,
  addArticle,
  patchArticleById,
} = require('../models/allArticles');

exports.getArticles = (req, res, next) => {
  const {
    author,
    topic,
    sort_by,
    order,
  } = req.query;

  const query = author ? {

      'articles.author': author
    } :
    topic ? {
      'articles.topic': topic
    } : {};

  allArticles(query, sort_by, order).then((articles) => {
    res.status(200).send({
      articles
    });
  });
};

exports.postArticle = (req, res, next) => {
  const newArticle = req.body;
  addArticle(newArticle).then((insertedArticle) => {
    res.status(201).send({
      insertedArticle
    });
  });
};

exports.patchArticle = (req, res, next) => {
  const {
    article_id
  } = req.params

  const incVotes = req.body

  patchArticleById(article_id, incVotes).then((patchedArticle) => {
    res.status(201).send({
      patchedArticle
    })
  });
};