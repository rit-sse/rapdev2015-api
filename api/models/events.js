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

  models.event = Event;
}
