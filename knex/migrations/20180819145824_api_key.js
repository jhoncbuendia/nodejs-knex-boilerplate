
exports.up = function(knex, Promise) {
    return knex.schema.createTable('api_key', function(table){
        table.increments();
        table.integer('value').notNullable().unique();
      });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('api_key');
};
