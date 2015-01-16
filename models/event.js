'use strict';

var bookshelf = require('../db');
var checkit = require('checkit');

function startTimeBeforeEndTime(v, next) {
  var start = new Date(v);
  var end = new Date(this.endTime);
  if(start < end) {
    return next();
  }
  return next('start-time-after-end-time');
}

function isDate(v, next) {
  if (v instanceof Date) {
    if ( !isNaN(v.getTime()) ) {
      return next();
    }
  }
  return next('is not type Date');
}


var Event = bookshelf.Model.extend({
  tableName: 'events',
  hasTimestamps: true,
  initialize: function() {
    this.on('saving', this.validate);
  },

  validate: function() {
    return checkit({
      name: 'required',
      startTime: 'required',
      endTime: 'required'
    }).run(this.attributes);
  },

  user: function() {
    return this.morphMany('Settings', 'settable');
  },

  permissions: function() {
    return this.morphMany('Permission', 'subject');
  },

  tags: function() {
    return this.belongsToMany('Tag');
  }
});

module.exports = bookshelf.model('Event', Event);
