
'use strict';

var orm = require('orm');

module.exports = function(db, models) {
  var Facebook = db.define('facebook', {
    userId: String
  }, {
    validate: {
      userId: [
        orm.validators.required(),
        orm.validators.unique(),
        orm.validators.notEmptyString()
      ]
    }
  });

  Facebook.associate = function(models) {
 }

  models.facebook = Facebook;
}
