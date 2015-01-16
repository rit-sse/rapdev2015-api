'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('reminders', function(t) {
    t.increments('id');
    t.string('type');
    t.integer('minutesBefore');
    t.integer('settings_id');
    t.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('reminders');
};
