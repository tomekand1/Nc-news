exports.handle404 = (err, req, res, next) => {
  if (err.status === 404) res.status(404).send({ msg: 'Route not Found' });
  else {
    next(err);
  }
};

exports.handle405 = (req, res, next) => {
  res.status(405).send({ msg: 'method not allowed' });
};

exports.handle400 = (err, req, res, next) => {
  console.log(err.code);
  input = {
    nullValue: 'invalid value'
  };
  if (err.code === '23502' || err.code === '42703' || err.code === '22P02') {
    res.status(400).send({ msg: input.nullValue });
  } else {
    next(err);
  }
};

exports.handle422 = (err, req, res, next) => {
  input = {
    nullValue: 'null or missing value'
  };
  if (err.code === '23505') {
    res.status(422).send({ msg: input.nullValue });
  } else {
    next(err);
  }
};

exports.handle500 = (err, req, res, next) => {
  res.status(500).send('Internal server error');
};
