'use strict';

var db = require('../db');

var TagPermission = db.define('TagPermission', {
  type: String,
  pending: Boolean
});

TagPermission.validatesPresenceOf('type', 'pending')
TagPermission.validatesInclusionOf('type', { in: ['Subscriber', 'Owner'] });

TagPermission.associate = function() {
  TagPermission.belongsTo(db.models.Identity, { as: 'identity', foreignKey: 'identityId' });
  TagPermission.belongsTo(db.models.Tag, { as: 'tag', foreignKey: 'tagId' });
}

module.exports = TagPermission;
