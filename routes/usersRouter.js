const usersRouter = require('express').Router();
const {
  getUsers,
  getUserByUsername,
  postUser,
} = require('../controllers/users');

const { handle405 } = require('../errors');

usersRouter
  .route('/')
  .get(getUsers)
  .post(postUser)
  .all(handle405);

usersRouter.route('/:username').get(getUserByUsername);
module.exports = usersRouter;
