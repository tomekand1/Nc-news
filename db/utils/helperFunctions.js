exports.dataToSql = arr => arr.map(el => ({
  title: el.title,
  topic: el.topic,
  author: el.author,
  body: el.body,
  created_at: new Date(el.created_at),
  votes: el.votes,
}));

exports.articleId = (obj) => {
  const result = obj.reduce((map, obj) => {
    map[obj.title] = obj.article_id;
    return map;
  }, {});
  return result;
};

exports.newCommentsObj = (arr, obj) => arr.map(el => ({
  article_id: obj[el.belongs_to],
  body: el.body,
  author: el.created_by,
  votes: el.votes,
  created_at: new Date(el.created_at),
}));
