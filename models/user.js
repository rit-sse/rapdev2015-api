'use strict';

var db = require('../db');
var AuthMethod = require('./auth-method');

var User = db.define('User', {
  preferredEmail: String
});

User.validatesPresenceOf('preferredEmail');

User.associate = function(models) {
  User.hasMany(AuthMethod, { as: 'authMethods', foreignKey: 'userId' });
  User.hasMany(models.IdentityPermission, { as: 'identityPermissions', foreignKey: 'userId' });
  User.hasMany(models.EventSettings, { as: 'eventSettings', foreignKey: 'userId' });
  User.hasMany(models.TodoSettings, { as: 'todoSettings', foreignKey: 'userId' });
}

User.createUser = function( config, type, next, cb ) {
  var am = {
    authId: config.id,
    type: type
  };
  var email = config.email;
  AuthMethod.findOne( { where: am } , function (err, authMethod) {
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
      cb(authMethod.user());
    }
  });
}

module.exports = User;
