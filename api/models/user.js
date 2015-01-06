"use strict";

var Sequelize = require('sequelize')

module.exports = function(sequelize, DataTypes){
  var User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING(500),
      allowNull: false,
      validate: {
        isEmail: true
      }
    }
  }, {
    classMethods: {
      associate : function(models) {
        User.hasMany(models.CalendarItem, { as: 'ItemOwner'});
        User.hasMany(models.CalendarItem, { as: 'InvitedBy'});
        User.hasMany(models.Todo),
        User.hasMany(models.Tag),
        User.hasMany(models.Event, { as: 'owner' })
      }
    }
  });
  return User;
};