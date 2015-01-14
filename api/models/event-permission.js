'use strict';

var db = require('../db');

var EventPermission = db.define('EventPermission', {
  type: String,
  pending: Boolean
});

EventPermission.validatesPresenceOf('type', 'pending')
EventPermission.validatesInclusionOf('type', { in: ['Read', 'Admin', 'Owner'] });

EventPermission.associate = function(models) {
  EventPermission.belongsTo(models.Calendar, { as: 'calendar', foreignKey: 'calendarId' });
  EventPermission.belongsTo(models.Event, { as: 'event', foreignKey: 'eventId' });
}

module.exports = EventPermission;
