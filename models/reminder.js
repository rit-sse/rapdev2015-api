'use strict';

var bookshelf = require('../db');
var checkit = require('checkit');

var Settings = require('./settings');

var Reminder = bookshelf.Model.extend({
  tableName: 'reminders',
  initialize: function() {
    this.on('saving', this.validate);
  },

  validate: function() {
    return checkit({
      minutesBefore: 'required',
      type: ['required'] // in email
    }).run(this.attributes);
  },

  settings: function() {
    return this.belongsTo(Settings);
  }
});

module.exports = Reminder;
