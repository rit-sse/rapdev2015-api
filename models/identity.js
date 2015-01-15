'use strict';

var db = require('../db');

var Identity = db.define('Identity', {
  name: String,
  singular: Boolean
});

Identity.validatesPresenceOf('name', 'singular');

Identity.associate = function(models) {
  Identity.hasMany(models.IdentityPermission, { as: 'identityPermissions', foreignKey: 'identityId'});
  Identity.hasMany(models.EventPermission, { as: 'eventPermissions', foreignKey: 'identityId'});
  Identity.hasMany(models.TagPermission, { as: 'tagPermissions', foreignKey: 'identityId'});
  Identity.hasMany(models.Event, { as: 'eventsOwned', foreignKey: 'ownerId'});
  Identity.hasMany(models.Event, { as: 'eventsInvitedTo', foreignKey: 'invitedById'});
  Identity.hasMany(models.Todo, { as: 'todos', foreignKey: 'identityId' });
}

module.exports = Identity;
