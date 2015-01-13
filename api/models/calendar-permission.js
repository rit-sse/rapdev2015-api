'use strict';

var orm = require('orm');

module.exports = function(db, models) {

  var CalendarPermission = db.define('calendar_ermissions', {
    type: ['READ', 'EDIT', 'ADMIN', 'INVITE']
  });

  CalendarPermission.associate = function(models) {
    CalendarPermission.hasOne('user', models.user, { reverse: 'permissions' });
    CalendarPermission.hasOne('event', models.Event, { reverse: 'permissions' });
  }

  models.calendarPermission = CalendarPermission;
}
