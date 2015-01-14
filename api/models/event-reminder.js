'use strict';

var db = require('../db');

var EventReminder = db.define('EventReminder', {
  type: String,
  minutesBefore: Number
});

EventReminder.validatesPresenceOf('type', 'minutesBefore')
EventReminder.validatesInclusionOf('minutesBefore', {in: ['Email']}); // add more later

EventReminder.associate = function(models) {
  EventReminder.belongsTo(models.EventSettings, { as: 'eventSettings', foreignKey: 'settingsId' });
}

module.exports = EventReminder;