'use strict';

var bookshelf = require('../db');
var checkit = require('checkit');
var validators = require('./validators');

var Reminder = bookshelf.Model.extend({
  tableName: 'reminders',
  hasTimestamps: true,
  initialize: function() {
    this.on('saving', this.validate);
  },

  validate: function() {
    return checkit({
      minutesBefore: 'required',
      type: ['required', validators.includes(['Email'])]
    }).run(this.attributes);
  },

  settings: function() {
    return this.belongsTo('Settings');
  }
});

module.exports = bookshelf.model('Reminder', Reminder);
