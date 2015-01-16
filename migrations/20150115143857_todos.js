'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('todos', function(t) {
    t.increments('id');
    t.string('name');
    t.datetime('dueDate');
    t.boolean('completed');
    t.integer('elapsedTime');
    t.integer('identity_id');
    t.integer('parent_id');
    t.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('todos');
};
