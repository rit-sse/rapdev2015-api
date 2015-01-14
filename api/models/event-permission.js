'use strict';

var db = require('../db');

var EventPermission = db.define('EventPermission', {
  type: String,
  pending: Boolean
});

EventPermission.validatesPresenceOf('type', 'pending')
EventPermission.validatesInclusionOf('type', { in: ['Read', 'Edit'] });

EventPermission.associate = function(models) {
  EventPermission.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
  EventPermission.belongsTo(models.Event, { as: 'event', foreignKey: 'eventId' });
}

module.exports = EventPermission;
