exports.up = function(knex, Promise) {
  return knex.schema.createTable('topics', topic_table => {
    topic_table
      .string('slug')
      .unique()
      .primary()
      .notNull();
    topic_table.text('description').notNull();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('topics');
};
