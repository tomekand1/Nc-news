const connection = require('../db/connection');

exports.getAllUsers = () => connection.select('*').from('users');

exports.showUserByUsername = userName => connection
  .select('*')
  .from('users')
  .where(userName);

exports.postNewUser = newUser => connection
  .insert(newUser)
  .into('users')
  .returning('*');
