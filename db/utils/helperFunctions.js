exports.dataToSql = arr => arr.map(el => ({
  title: el.title,
  topic: el.topic,
  author: el.author,
  body: el.body,
  created_at: new Date(el.created_at),
  votes: el.votes,
}));


exports.newCommentsObj = arr => arr.map(el => ({
  article_id: el.article_id,
  body: el.body,
  author: el.created_by,
  votes: el.votes,
  created_at: new Date(el.created_at),
}));
