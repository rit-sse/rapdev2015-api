'use strict';

module.exports = function(db, models) {
  var Reminder = db.define('reminders', {
    type: ['Email' ], //Add more if needed
    minutesBefore: Number
  });

  Reminder.associate = function(models) {
    Reminder.hasOne('calendarItem', models.calendarItem, { reverse: 'reminders' });
    Reminder.hasOne('todo', models.todo, { reverse: 'reminders' });
  }

  models.reminder = Reminder;
}
