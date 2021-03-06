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
      res.status(200).send({ articles });
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
    .then(([article]) => {
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
    .then(([article]) => {
      res.status(201).send({
        article,
      });
    })
    .catch(next);
};

exports.patchArticle = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;

  const votes = typeof inc_votes === 'number' ? inc_votes : 0;

  patchArticleById(article_id, votes)
    .then(([patchedArticle]) => {
      res.status(200).send({
        patchedArticle,
      });
    })
    .catch(next);
};

exports.deleteArticleById = (req, res, next) => {
  const { article_id } = req.params;

  deleteArticleByIdAndAssociatedValues(article_id)
    .then((result) => {
      result === 0 ? next({ status: 404 }) : res.sendStatus(204);
    })
    .catch(next);
};
