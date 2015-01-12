'use strict';

var orm = require("orm");

function startTimeBeforeEndTime(v, next) {
  if(v < this.endTime) {
    return next();
  }
  return next('start-time-after-end-time');
}

module.exports = function(db, models) {
  var Event = db.define('events', {
    name: String,
    description: String,
    startTime: Date,
    endTime: Date
  }, {
    validations: {
      name: [
        orm.validators.required(),
        orm.validators.notEmptyString(),
        startTimeBeforeEndTime
      ]
    }
  });

  Event.associate = function(models) {
    Event.hasOne('user', models.user, { reverse: 'events' });
  }

  Event.findAllById = function(userId, cb){
    Event.find({user: userId}, cb);
  }

  Event.createEvent = function(name, description, startTime, endTime, userId, cb) {
    Event.create({name: name, description: description, startTime: startTime, endTime: endTime, user_id: userId}, cb)
  }

  models.event = Event;
}
