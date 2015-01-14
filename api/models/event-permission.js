'use strict';

var db = require('../db');

var EventPermission = db.define('EventPermission', {
  type: String,
  pending: Boolean
});

EventPermission.validatesPresenceOf('type', 'pending')
EventPermission.validatesInclusionOf('type', { in: ['Read', 'Owner'] });

EventPermission.associate = function(models) {
  EventPermission.belongsTo(models.Identity, { as: 'identity', foreignKey: 'identityId' });
  EventPermission.belongsTo(models.Event, { as: 'event', foreignKey: 'eventId' });
}

module.exports = EventPermission;
