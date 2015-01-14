'use strict';

var db = require('../db');

var TagPermission = db.define('TagPermission', {
  type: String,
  pending: Boolean
});

TagPermission.validatesPresenceOf('type', 'pending')
TagPermission.validatesInclusionOf('type', { in: ['Read', 'Edit'] });

TagPermission.associate = function(models) {
  TagPermission.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
  TagPermission.belongsTo(models.Tag, { as: 'tag', foreignKey: 'tagId' });
}

module.exports = TagPermission;
