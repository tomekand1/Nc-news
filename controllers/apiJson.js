const fs = require('fs');
exports.getJson = (req, res, next) => {
  const jsonData = JSON.parse(fs.readFileSync('./api.json', 'utf8'));
  res.status(200).send(jsonData);
};
