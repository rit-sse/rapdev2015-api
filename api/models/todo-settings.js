'use strict';

var db = require('../db');

var TodoSettings = db.define('TodoSettings', { });

TodoSettings.associate = function(models) {
  TodoSettings.belongsTo(models.User, { as: 'owner', foreignKey: 'ownerId'});

  TodoSettings.hasMany(models.TodoReminder, { as: 'reminders', foreignKey: 'settingsId' });
}

module.exports = TodoSettings;
