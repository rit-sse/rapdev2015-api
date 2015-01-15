'use strict';

var db = require('../db');

var EventPermission = db.define('EventPermission', {
  type: String,
  pending: Boolean
});

EventPermission.validatesPresenceOf('type', 'pending')
EventPermission.validatesInclusionOf('type', { in: ['Read', 'Owner'] });

EventPermission.associate = function() {
  EventPermission.belongsTo(db.models.Identity, { as: 'identity', foreignKey: 'identityId' });
  EventPermission.belongsTo(db.models.Event, { as: 'event', foreignKey: 'eventId' });
}

module.exports = EventPermission;
