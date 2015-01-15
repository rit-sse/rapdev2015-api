'use strict';

var db = require('../db');

var Identity = db.define('Identity', {
  name: String,
  singular: Boolean
});

Identity.validatesPresenceOf('name', 'singular');

Identity.associate = function() {
  Identity.hasMany(db.models.IdentityPermission, { as: 'permissions', foreignKey: 'identityId'});
  Identity.hasMany(db.models.EventPermission, { as: 'eventPermissions', foreignKey: 'identityId'});
  Identity.hasMany(db.models.TagPermission, { as: 'tagPermissions', foreignKey: 'identityId'});
  Identity.hasMany(db.models.Todo, { as: 'todos', foreignKey: 'identityId' });
}

Identity.prototype.events = function() {
  return this.eventPermissions().reduce(function(events, eventPermission) {
    events.concat(eventPermission.events());
  }, []);
}

Identity.prototype.ownedBy = function() {
  this.identityPerissi
}

module.exports = Identity;
