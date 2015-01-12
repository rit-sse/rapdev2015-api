'use strict';

var orm = require('orm');

module.exports = function(db, models) {
  var User = db.define('users', {
      email: String
   }, {
    validations: {
      email: [
        orm.validators.required(),
        orm.validators.unique(),
        orm.validators.notEmptyString(),
        orm.validators.patterns.email()
      ]
    }
  });

  User.associate = function(models) { }

  User.createUser = function(config, models, cb) {
    var facebook = {};
    facebook.facebookId = config.id;
    var email = config.email;
    models.facebook.find({facebookId: facebook.facebookId}, function (err, users) {
      if(users.length == 0) {
        models.facebook.create(facebook, function(err,results) {
          var fbidResults = results;

          User.create({ email: email }, function(err, results) {
            var userResult = results;
            userResult.setFacebook(fbidResults, function(err){
               cb(userResult.id);
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
