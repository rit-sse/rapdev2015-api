'use strict';

var db = require('../db');

var User = db.define('User', {
  preferredEmail: String
});

User.validatesPresenceOf('preferredEmail');

User.associate = function() {
  User.hasMany(db.models.AuthMethod, { as: 'authMethods', foreignKey: 'userId' });
  User.hasMany(db.models.IdentityPermission, { as: 'identityPermissions', foreignKey: 'userId' });
  User.hasMany(db.models.EventSettings, { as: 'eventSettings', foreignKey: 'userId' });
  User.hasMany(db.models.TodoSettings, { as: 'todoSettings', foreignKey: 'userId' });
}

User.createUser = function( config, type, next, cb ) {
  var am = {
    authId: config.id,
    type: type
  };
  var email = config.email;
  db.models.AuthMethod.findOne( { where: am } , function (err, authMethod) {
    if(err) return next(err);
    if(!authMethod) {
      if(err) return next(err);
      var user = new User({ preferredEmail: email });
      user.save(function(err) {
        if(err) return next(err);
        user.authMethods.create(am, function(err){
          cb(user);
        });
      });
    } else {
      console.log(authMethod.user());
      cb(authMethod.user());
    }
  });
}


User.prototype.getEvents = function() {
  this.identityPermissions().forEach(function(identityPermission){
    return identityPermission.idenities().reduce(function(a, identity ){
      a.concat(identity.events());
    });
  });
}

User.prototype.addEvent = function(event, next) {
  var event = new Event(event);
  this.events.create(event, function(err) {
    if(err) return next(err);
  });
}

module.exports = User;
