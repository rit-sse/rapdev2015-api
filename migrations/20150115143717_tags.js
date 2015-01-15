'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('tags', function(t) {
    t.string('name');
    t.string('color');
    t.string('visibility');
    t.integer('identity_id');
    t.primary(['identity_id','name']);
    t.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tags');
};
