'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('tags_todos', function(t) {
    t.increments('id');
    t.integer('tag_id')
      .references('id')
      .inTable('tags')
      .index();
    t.integer('todo_id')
      .references('id')
      .inTable('todos')
      .index();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tags_todos');
};
