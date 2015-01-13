'use strict';

var orm = require('orm');

module.exports = function(db, models) {

  var TagPermission = db.define('tag_permissions', {
    type: ['READ', 'EDIT'],
    pending: Boolean
  });

  TagPermission.associate = function(models) {
    TagPermission.hasOne('user', models.user, { reverse: 'permissions' });
    TagPermission.hasOne('tag', models.Event, { reverse: 'permissions' });
  }

  models.tagPermission = TagPermission;
}
