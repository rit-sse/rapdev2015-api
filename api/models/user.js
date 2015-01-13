'use strict';

var orm = require('orm');

module.exports = function(db, models) {
  var User = db.define('users', {
      preferredEmail: String
   }, {
    validations: {
      preferredEmail: [
        orm.validators.required(),
        orm.validators.unique(),
        orm.validators.notEmptyString(),
        orm.validators.patterns.email()
      ]
    }
  });

  User.associate = function(models) { }

  User.createUser = function(config, type, models, cb) {
    var authMethod = {
      authId: config.id,
      type: type
    };
    var email = config.email; //for the time being
    models.authMethod.find( authMethod , function (err, users) {
      if(users.length == 0) {
        models.authMethod.create(authMethod, function(err,results) {
          var authResults = results;

          User.create({ preferedEmail: email }, function(err, results) {
            if (err) throw err;
            var userResult = results;
            userResult.setAuthMethods(authResults, function(err){
               cb(userResult);
            });
          });
        });
      } else {
        cb(users[0]);
      }
    });
  }

  models.user = User;
}
