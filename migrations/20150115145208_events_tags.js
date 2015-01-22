'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('events_tags', function(t) {
    t.increments('id');
    t.integer('tag_id')
      .references('id')
      .inTable('tags')
      .index();
    t.integer('event_id')
      .references('id')
      .inTable('events')
      .index();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('events_todos');
};
