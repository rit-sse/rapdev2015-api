'use strict';

var bookshelf = require('../db');
var checkit = require('checkit');

var Settings = bookshelf.Model.extend({
  tableName: 'settings',
  initialize: function() {
    this.on('saving', this.validate);
  },

  validate: function() {
    return checkit({}).run(this.attributes);
  },

  reminders: function() {
    return this.hasMany('Reminder');
  },

  user: function() {
    return this.belongsTo('User');
  },

  settable: function() {
    return this.morphTo('settable', 'Event', 'Todo');
  }
});

module.exports = bookshelf.model('Settings', Settings);
