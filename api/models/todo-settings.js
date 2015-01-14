'use strict';

var db = require('../db');

var TodoSettings = db.define('TodoSettings', { });

TodoSettings.associate = function(models) {
  TodoSettings.belongsTo(models.User, { as: 'owner', foreignKey: 'ownerId'});
  TodoSettings.belongsTo(models.Event, { as: 'todo', foreignKey: 'todoId'});

  TodoSettings.hasMany(models.TodoReminder, { as: 'reminders', foreignKey: 'settingsId' });

  TodoSettings.hasAndBelongsToMany('tags', { model: models.Tag });
}

module.exports = TodoSettings;
