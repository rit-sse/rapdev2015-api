'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('events_todos', function(t) {
    t.increments('id');
    t.integer('event_id');
    t.integer('todo_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('events_todos');
};
