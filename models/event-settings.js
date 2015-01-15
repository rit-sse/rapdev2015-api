'use strict';

var db = require('../db');

var EventSettings = db.define('EventSettings', { });

EventSettings.associate = function() {
  EventSettings.belongsTo(db.models.User, { as: 'user', foreignKey: 'userId'});
  EventSettings.belongsTo(db.models.Event, { as: 'event', foreignKey: 'eventId'});

  EventSettings.hasMany(db.models.EventReminder, { as: 'reminders', foreignKey: 'settingsId' });
}

module.exports = EventSettings;
