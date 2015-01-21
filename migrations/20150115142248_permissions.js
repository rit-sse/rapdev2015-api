'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('permissions', function(t) {
    t.increments('id');
    t.string('type');
    t.boolean('pending');
    t.string('subject_type');
    t.integer('subject_id');
    t.string('authorizee_type');
    t.integer('authorizee_id');
    t.unique(['subject_type', 'subject_id', 'authorizee_type', 'authorizee_id']);
    t.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('permissions');
};
