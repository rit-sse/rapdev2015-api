'use strict';

var db = require('../db');

var CalendarPermission = db.define('CalendarPermission', {
  type: String,
  pending: Boolean
});

CalendarPermission.validatesPresenceOf('type', 'pending')
CalendarPermission.validatesInclusionOf('type', { in: ['Subscriber', 'Owner'] });

CalendarPermission.associate = function(models) {
  CalendarPermission.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
  CalendarPermission.belongsTo(models.Calendar, { as: 'calendar', foreignKey: 'calendarId' });
}

module.exports = CalendarPermission;
