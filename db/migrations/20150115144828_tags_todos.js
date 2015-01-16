'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('tags_todos', function(t) {
    t.increments('id');
    t.integer('tag_id');
    t.integer('todo_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tags_todos');
};
