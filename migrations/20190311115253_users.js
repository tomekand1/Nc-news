exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', user_table => {
    user_table
      .string('username')
      .unique()
      .primary();
    user_table.string('avatar_url');
    user_table.string('name').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
