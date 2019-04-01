const {
  getAllUsers,
  showUserByUsername,
  postNewUser,
} = require('../models/allUsers');

exports.getUsers = (req, res, next) => {
  getAllUsers()
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch(next);
};

exports.getUserByUsername = (req, res, next) => {
  const username = req.params;
  showUserByUsername(username)
    .then(([user]) => {
      res.status(200).send({ user });
    })
    .catch(next);
};

exports.postUser = (req, res, next) => {
  const newUser = req.body;
  postNewUser(newUser)
    .then(([user]) => {
      res.status(200).send({ user });
    })
    .catch(next);
};
