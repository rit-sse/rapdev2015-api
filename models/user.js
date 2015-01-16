'use strict';

var bookshelf = require('../db');
var checkit = require('checkit');
var Promise = require('bluebird');

var User = bookshelf.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  initialize: function() {
    this.on('saving', this.validate);
  },

  validate: function() {
    return checkit({
      preferredEmail: ['required', 'unique']
    }).run(this.attributes);
  },

  permissions: function() {
    return this.morphMany('Permission', 'authorizee');
  },

  settings: function() {
    return this.belongsToMany('Settings');
  },

  authMethods: function() {
    return this.hasMany('AuthMethod');
  }
});

module.exports = bookshelf.model('User', User);
