'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(t) {
    t.increments('id');
    t.integer('preferredEmail');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
