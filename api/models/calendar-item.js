'use strict';

var orm = require('orm');

module.exports = function(db, models) {
  var CalendarItem = db.define('calendar_items', {
    accepted: ['Accepted', 'Pending', 'Declined']
  }, {
    validations: {
      accepted: orm.validators.required()
    }
  });

  CalendarItem.associate = function(models) {
    CalendarItem.hasOne('calendar', models.calendar, { reverse: 'calendarItems' });
    CalendarItem.hasOne('invitedBy', models.user, { reverse: 'itemsInvitedTo' });
    CalendarItem.hasOne('event', models.event, { reverse: 'calendarItems' });
  }

  models.calendarItem = CalendarItem;
}

