'use strict';

var db = require('../db');

var EventSettings = db.define('EventSettings', { });

EventSettings.associate = function(models) {
  EventSettings.belongsTo(models.User, { as: 'owner', foreignKey: 'ownerId'});
  EventSettings.belongsTo(models.User, { as: 'invitedBy', foreignKey: 'invitedById'});
  EventSettings.belongsTo(models.Event, { as: 'event', foreignKey: 'eventId'});

  EventSettings.hasMany(models.EventReminder, { as: 'reminders', foreignKey: 'settingsId' });

  EventSettings.hasAndBelongsToMany('tags', { model: models.Tag });
}

module.exports = EventSettings;
