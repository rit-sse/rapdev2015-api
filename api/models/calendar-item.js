'use strict';

module.exports = function(db, models) {
  var CalendarItem = db.define('calendar_items', {
    emailReminder: Boolean,
    accepted: ['Accepted', 'Pending', 'Declined']
  });

  CalendarItem.associate = function(models) {
    CalendarItem.hasOne('itemOwner', models.user, { reverse: 'itemsOwned' });
    CalendarItem.hasOne('invitedBy', models.user, { reverse: 'itemsInvitedTo' });
    CalendarItem.hasOne('event', models.event, { reverse: 'calendarItems' });
  }

  models.calendarItem = CalendarItem;
};

