'use strict';

var orm = require('orm');

module.exports = function(db, models) {
  var User = db.define('users', {
    trash: String
  }, {
  });

  User.associate = function(models) {
    User.hasMany('facebook', models.facebook, {}, { reverse: 'users'});
 }

  models.user = User;
}
