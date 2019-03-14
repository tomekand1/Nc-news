const {
  allArticles,
  addArticle,
  patchArticleById,
  deleteArticleByIdAndAssociatedValues,
  showArticleById,
} = require('../models/allArticles');

exports.getArticles = (req, res, next) => {
  const {
    author, topic, sort_by, order,
  } = req.query;

  const query = author
    ? {
      'articles.author': author,
    }
    : topic
      ? {
        'articles.topic': topic,
      }
      : {};

  allArticles(query, sort_by, order)
    .then((articles) => {
      res.status(200).send({
        articles,
      });
    })
    .catch(next);
};

exports.getArticleById = (req, res, next) => {
  const id = req.params.article_id;
  const articleID = id
    ? {
      article_id: id,
    }
    : {};

  showArticleById(articleID)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.postArticle = (req, res, next) => {
  const newArticle = req.body;

  delete Object.assign(newArticle, {
    author: newArticle.username,
  }).username;

  addArticle(newArticle)
    .then((insertedArticle) => {
      res.status(201).send({
        insertedArticle,
      });
    })
    .catch(next);
};

exports.patchArticle = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;

  patchArticleById(article_id, inc_votes)
    .then((patchedArticle) => {
      res.status(201).send({
        patchedArticle,
      });
    })
    .catch(next);
};

exports.deleteArticleById = (req, res, next) => {
  const { article_id } = req.params;
  deleteArticleByIdAndAssociatedValues(article_id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(next);
};
