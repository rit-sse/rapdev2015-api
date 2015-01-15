'use strict';

var db = require("../db");

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


var Event = db.define('Event', {
  name: String,
  description: String,
  startTime: Date,
  endTime: Date
});

Event.validatesPresenceOf('name', 'startTime', 'endTime');

Event.associate = function() {
  Event.hasMany(db.models.EventSettings, { as: 'settings', foreignKey: 'eventId'});
  Event.hasMany(db.models.EventPermission, { as: 'permissions', foreignKey: 'eventId' });

  Event.hasAndBelongsToMany('tags', { model: db.models.Tag });
}

module.exports = Event;
