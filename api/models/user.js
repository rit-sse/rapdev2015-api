'use strict';

var orm = require('orm');

module.exports = function(db, models) {
  var User = db.define('users', {
    email: String
  }, {
    validate: {
      email: [
        orm.validators.required(),
        orm.validators.unique(),
        orm.validators.notEmptyString(),
        orm.validators.patterns.email()
      ]
    }
  });

  User.associate = function(models) { }

  models.user = User;
}
