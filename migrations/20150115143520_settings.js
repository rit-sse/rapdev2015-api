'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('settings', function(t) {
    t.increments('id');
    t.integer('user_id');
    t.string('settable_type');
    t.integer('settable_id');
    t.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('settings');
};
