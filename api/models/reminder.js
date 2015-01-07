'use strict';

var orm = require('orm');

module.exports = function(db, models) {
  var Reminder = db.define('reminders', {
    type: ['Email'], //Add more if needed
    minutesBefore: Number
  }, {
    validations: {
      type: orm.validators.required(),
      minutesBefore: orm.validators.required()
    }
  });

  Reminder.associate = function(models) {
    Reminder.hasOne('calendarItem', models.calendarItem, { reverse: 'reminders' });
    Reminder.hasOne('todo', models.todo, { reverse: 'reminders' });
  }

  models.reminder = Reminder;
}
