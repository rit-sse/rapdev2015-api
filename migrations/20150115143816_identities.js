'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('identities', function(t) {
    t.increments('id')
    t.string('name').unique();
    t.boolean('singular');
    t.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('identities');
};
