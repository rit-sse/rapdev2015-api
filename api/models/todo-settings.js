'use strict';

var db = require('../db');

var TodoSettings = db.define('TodoSettings', { });

TodoSettings.associate = function() {
  TodoSettings.belongsTo(db.models.User, { as: 'user', foreignKey: 'userId'});
  TodoSettings.belongsTo(db.models.Todo, { as: 'todo', foreignKey: 'todoId' });
  TodoSettings.hasMany(db.models.TodoReminder, { as: 'reminders', foreignKey: 'settingsId' });
}

module.exports = TodoSettings;
