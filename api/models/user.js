'use strict';

var db = require('../db');

var User = db.define('users', {
  preferredEmail: String
});


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