exports.handle404 = (req, res, next) => {
  res.status(404).send({ msg: 'Route not Found' });
};

exports.handle405 = (req, res, next) => {
  res.status(405).send({ msg: 'method not allowed' });
};

exports.handle400 = (err, req, res, next) => {
  if (err.code === '23502') {
    res.status(400).send({ msg: err.message });
  } else {
    next(err);
  }
};

exports.handle500 = (err, req, res, next) => {
  res.status(500).send('Internal server error');
};
