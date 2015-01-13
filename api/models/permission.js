'use strict';

var orm = require('orm');

module.exports = function(db, models) {

  var Permission = db.define('permissions', {
    name: String,
    type: ['READ', 'EDIT', 'ADMIN', 'INVITE']
  });

  Permission.associate = function(models) {
    Permission.hasOne('calendar', models.calendar, { reverse: 'permissions' });
    Permission.hasOne('user', models.user, { reverse: 'permissions' });
    Permission.hasOne('event', models.Event, { reverse: 'permissions' });
  }

  models.permission = Permission;
}
