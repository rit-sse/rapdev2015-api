'use strict';

var db = require('../db');

var TodoSettings = db.define('TodoSettings', { });

TodoSettings.associate = function(models) {
  TodoSettings.belongsTo(models.User, { as: 'user', foreignKey: 'userId'});
  TodoSettings.belongsTo(models.Todo, { as: 'todo', foreignKey: 'todoId' });
  TodoSettings.hasMany(models.TodoReminder, { as: 'reminders', foreignKey: 'settingsId' });


}

module.exports = TodoSettings;
