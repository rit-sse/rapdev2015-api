
'use strict';

var orm = require('orm');

module.exports = function(db, models) {
  var Facebook = db.define('facebook', {
    facebookId: String
  }, {
    validations: {
      facebookId: [
        orm.validators.required(),
        orm.validators.unique(),
        orm.validators.notEmptyString()
      ]
    }
  });

  Facebook.associate = function(models) {
    Facebook.hasOne('user', models.user, { reverse: 'facebook' });
  }

  models.facebook = Facebook;
}
