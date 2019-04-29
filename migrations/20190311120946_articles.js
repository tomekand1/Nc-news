exports.up = function (knex, Promise) {
  return knex.schema.createTable('articles', (article_table) => {
    article_table.increments('article_id').primary();
    article_table.string('title', 100).notNullable();
    article_table.text('body').notNullable();
    article_table.integer('votes').defaultTo(0);
    article_table
      .string('topic')
      .references('slug')
      .inTable('topics');
    article_table
      .string('author')
      .references('username')
      .inTable('users')
      .onDelete('cascade');
    article_table
      .date('created_at', 6)
      .defaultTo(knex.fn.now(6))
      .notNullable();
  });
};
exports.down = function (knex, Promise) {
  return knex.schema.dropTable('articles');
};
