'use strict';

var db = require('../db');

var AuthMethod = db.define('AuthMethod', {
  authId: String,
  type: String
});

AuthMethod.validatesPresenceOf('authId', 'type');

AuthMethod.associate = function(models) {
  AuthMethod.belongsTo(models.User, { as: 'user',  foreignKey: 'userId' });
}

module.exports = AuthMethod;
