'use strict';

var bookshelf = require('../db');
var checkit = require('checkit');

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
  },

  events: function() {
    this.related('identities').fetch
  },

  render: function() {
    return this.set('url', '/users/' + this.id);
  }
});

module.exports = bookshelf.model('User', User);
