'use strict';

var db = require('../db');

var Calendar = db.define('Calendar', {
  name: String
});

Calendar.validatesPresenceOf('authId', 'type');

Calendar.associate = function(models) {
  Calendar.hasMany(models.CalendarPermission, { as: 'calendarPermissions', foreignKey: 'calendarId'});
  Calendar.hasMany(models.EventPermission, { as: 'eventPermissions', foreignKey: 'calendarId'});
  Calendar.hasMany(models.TagPermission, { as: 'tagPermissions', foreignKey: 'calendarId'});
  Calendar.hasMany(models.Event, { as: 'eventsOwned', foreignKey: 'ownerId'});
  Calendar.hasMany(models.Event, { as: 'eventsInvitedTo', foreignKey: 'invitedById'});
  Calendar.hasMany(models.Todo, { as: 'todoSettings', foreignKey: 'calendarId' });
}

module.exports = Calendar;
