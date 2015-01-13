'use strict';

var orm = require('orm');

module.exports = function(db, models) {

  var EventPermission = db.define('event_permissions', {
    type: ['READ', 'EDIT'],
    pending: Boolean
  });

  EventPermission.associate = function(models) {
    EventPermission.hasOne('user', models.user, { reverse: 'permissions' });
    EventPermission.hasOne('event', models.Event, { reverse: 'permissions' });
  }

  models.eventPermission = EventPermission;
}
