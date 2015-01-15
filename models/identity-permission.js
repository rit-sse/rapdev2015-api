'use strict';

var db = require('../db');

var IdentityPermission = db.define('IdentityPermission', {
  type: String,
  pending: Boolean
});

IdentityPermission.validatesInclusionOf('type', { in: ['Members', 'Owner'] });

IdentityPermission.associate = function() {
  IdentityPermission.belongsTo(db.models.User, { as: 'user', foreignKey: 'userId' });
  IdentityPermission.belongsTo(db.models.Identity, { as: 'identity', foreignKey: 'identityId' });
}

module.exports = IdentityPermission;
