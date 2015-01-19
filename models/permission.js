'use strict';

var bookshelf = require('../db');
var checkit = require('checkit');
var validators = require('./validators');

var Permission = bookshelf.Model.extend({
  tableName: 'permissions',
  hasTimestamps: true,
  initialize: function() {
    this.on('saving', this.validate);
  },

  validate: function() {
    return checkit({
      pending: 'required',
      type: ['required', validators.includes(['Read', 'Owner'])]
    }).run(this.attributes);
  },

  subject: function() {
    return this.morphTo('subject', 'Event', 'Identity', 'Tag');
  },

  authorizee: function() {
    return this.morphTo('authorizee', 'Identity', 'User');
  }
});

module.exports = bookshelf.model('Permission', Permission);
