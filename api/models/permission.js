'use strict';

var orm = require('orm');

module.exports = function(db, models) {

  var Permission = db.define('permissions', {
    name: String,
    type: ['READ', 'EDIT', 'ADMINISTRATE']
  });

  Permission.associate = function(models) {
    Permission.hasOne('calendar', models.calendar, { reverse: 'permissions' });
    Permission.hasOne('user', models.user, { reverse: 'permissions' });
  }

  models.permission = Permission;
}
