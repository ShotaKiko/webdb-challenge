
exports.up = function(knex, Promise) {
  return knex.schema.createTable('projects', tbl => {
      tbl.increments();
      tbl.string('Project Name', 128).notNullable().unique();
      tbl.string('Description', 255).notNullable();
      tbl.boolean('completed:')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('projects')
};
