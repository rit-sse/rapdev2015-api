'use strict';

var bookshelf = require('../db');
var checkit = require('checkit');

var Event = require('./event');
var Identity = require('./identity');
var Tag = require('./tag');
var User = require('./user');

var Permission = bookshelf.Model.extend({
  tableName: 'auth_methods',
  initialize: function() {
    this.on('saving', this.validate);
  },

  validate: function() {
    return checkit({
      pending: 'required',
      type: ['required'] // in read and owner
    }).run(this.attributes);
  },

  subject: function() {
    return this.morphTo('subject', Event, Identity, Tag);
  },

  authorizee: function() {
    return this.morphTo('authorizee', Identity, User);
  }
});

module.exports = Permission;
