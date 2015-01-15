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


Identity.createIdentity = function(name,singular,user, cb){
	Identity
		.forge({name:name, singular:singular, members:[user]})
		.save()
		.then(cb);
}

Identity.updateIdentity = function(identityId, name, singular, memberIds, cb){
	var members = new Collection(memberIds)
		.mapThen(function(memberId){
			User
				.where({id: memberId})
				.fetch()
				.then(function(member){
					return member;
				})
		});
	Identity
        .where({id: identityId})
        .fetch()
        .set({
          name: name,
          singular: singular,
          members: members
        })
}

Identity.returnIdentity = function(identityId, cb){
	Identity
	.where({id: identityId})
	.fetch()
	.set("url", "/identities/" + identityId)
	.then(cb);

}

module.exports = Identity;
