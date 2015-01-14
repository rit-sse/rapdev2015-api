'use strict';

var db = require('../db');

var User = db.define('User', {
  preferredEmail: String
});

User.validatesPresenceOf('email');

User.associate = function(models) {
  User.hasMany(models.AuthMethod, { as: 'authMethods', foreignKey: 'userId' });
  User.hasMany(models.IdentityPermission, { as: 'identityPermissions', foreignKey: 'userId' });
  User.hasMany(models.EventSettings, { as: 'eventSettings', foreignKey: 'userId' });
  User.hasMany(models.TodoSettings, { as: 'todoSettings', foreignKey: 'userId' });
}

User.createUser = function(config, type, models, cb) {
  var authMethod = {
    authId: config.id,
    type: type
  };
  var email = config.email;
  models.authMethod.find( authMethod , function (err, authMethods) {
    if(authMethods.length == 0) {
      models.authMethod.create(authMethod, function(err,results) {
        var authResults = results;

        User.create({ preferredEmail: email }, function(err, results) {
          if (err) throw err;
          var userResult = results;
          userResult.setAuthMethods(authResults, function(err){
             cb(userResult);
          });
        });
      });
    } else {
      authMethods[0].getUser(function(err, user){
        cb(user);
      });
    }
  });
}

module.exports = User;
