'use strict';

var orm = require("orm");

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
        orm.validators.notEmptyString()
      ]
    }
  });

  Event.associate = function(models) {
    Event.hasOne('user', models.user, { reverse: 'events' });
  }

  models.event = Event;
}
