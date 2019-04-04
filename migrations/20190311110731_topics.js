exports.up = function(knex, Promise) {
  return knex.schema.createTable('topics', topic_table => {
    topic_table
      .string('slug')
      .unique()
      .primary()
      .notNullable();
    topic_table.text('description').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('topics');
};
