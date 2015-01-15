'use strict';

var db = require('../db');

var EventSettings = db.define('EventSettings', { });

EventSettings.associate = function(models) {
  EventSettings.belongsTo(models.User, { as: 'user', foreignKey: 'userId'});
  EventSettings.belongsTo(models.Event, { as: 'event', foreignKey: 'eventId'});

  EventSettings.hasMany(models.EventReminder, { as: 'reminders', foreignKey: 'settingsId' });
}

module.exports = EventSettings;
