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

Event.associate = function(models) {
  Event.hasMany(models.EventSettings, { as: 'settings', foreignKey: 'eventId'});
  Event.hasMany(models.EventPermission, { as: 'permissions', foreignKey: 'eventId' });

  Event.hasAndBelongsToMany('tags', { model: models.Tag });
}

Event.findAllByUserId = function(userId, cb){
  Event.find({user: userId}, cb);
}

Event.findById = function(eventId, cb) {
  Event.find({id: eventId}, cb);
}

Event.updateEvent = function(eventId, name, description, startTime, endTime, cb) {
  Event.get(eventId, function(err, event) {
    if (err) {
      cb(err, event);
    }
    else {
      event.save({  name: name, description: description,
                    startTime: startTime, endTime: endTime}, cb);
    }
  });
}

Event.deleteEvent = function(eventId, cb) {
  Event.find({id: eventId}).remove(cb);
}

Event.createEvent = function(name, description, startTime, endTime, userId, models, cb) {
  models.user.find({id: userId}, function(err,user){
    if (err){
      cb(err);
    } else {
      models.event.create({name:name, description: description, startTime: startTime, endTime: endTime}, function(err,newEvent){
        if (err){
          cb(err);
        } else {
          var foundUser = user[0];
          newEvent.setUser(foundUser, cb);
        }
      });
    }
  });
}

module.exports = Event;
