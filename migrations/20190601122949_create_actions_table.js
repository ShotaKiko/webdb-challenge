
exports.up = async function(knex) {
    await knex.schema.createTable('actions', tbl => {
        tbl.increments();
        tbl.string('Action Description', 128).notNullable().unique();
        tbl.string('Notes', 255).notNullable();
        tbl.boolean('completed:')
        
      //foreign key
      tbl
      .integer('project_id')
      .unsigned()
      .references('id') //column
      .inTable('projects') //table refernce
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
      .notNullable()
    })
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('actions')
};
