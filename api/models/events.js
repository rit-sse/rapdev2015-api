'use strict';

var orm = require("orm");

module.exports = function(db, models) {
  var startTimeBeforeEndTime = function(v, next) {
    if(v < this.endTime) {
      return next();
    }
    return next('start-time-after-end-time');
  }

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

  models.event = Event;
}
