
exports.up = async function(knex) {
  await knex.schema.createTable('projects', tbl => {
      tbl.increments();
      tbl.string('Project Name', 128).notNullable().unique();
      tbl.string('Description', 255).notNullable();
      tbl.boolean('completed:')

  })
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('projects')
};
