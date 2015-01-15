'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('events', function(t) {
    t.increments('id');
    t.string('name');
    t.string('description');
    t.datetime('startTime');
    t.datetime('endTime');
    t.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('events');
};
