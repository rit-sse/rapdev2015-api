'use strict';

var db = require('../db');

var TodoReminder = db.define('TodoReminder', {
  type: String,
  minutesBefore: Number
});

TodoReminder.validatesPresenceOf('type', 'minutesBefore')
TodoReminder.validatesInclusionOf('minutesBefore', {in: ['Email']}); // add more later

TodoReminder.associate = function(models) {
  TodoReminder.belongsTo(models.Todo, { as: 'todo', foreignKey: 'todoId' });
}

module.exports = TodoReminder;
