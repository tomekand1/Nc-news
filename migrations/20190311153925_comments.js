exports.up = function(knex, Promise) {
  return knex.schema.createTable('comments', comment_table => {
    comment_table.increments('comment_id').primary();
    comment_table
      .string('author')
      .references('username')
      .inTable('users');
    comment_table
      .integer('article_id')
      .references('article_id')
      .inTable('articles')
      .onDelete('cascade');
    comment_table.integer('votes').defaultTo(0);
    comment_table
      .date('created_at', 6)
      .defaultTo(knex.fn.now(6))
      .notNullable();
    comment_table.text('body').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('comments');
};
