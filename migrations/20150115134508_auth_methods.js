'use strict';

exports.up = function(knex, Promise) {
  knex.schema.createTable('auth_methods', function(t) {
    t.increments('id');
    t.string('type');
    t.string('authId');
    t.integer('user_id');
    t.timestamps();
  });
};

exports.down = function(knex, Promise) {
  knex.schema.dropTable('auth_methods');
};
