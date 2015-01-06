"use strict";

var Sequelize = require('sequelize')

module.exports = function(sequelize, DataTypes){
  var User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING(64),
      allowNull: false},
    email: {
      type: DataTypes.STRING(500),
      allowNull: false,
      validate: {
        isEmail: true}
      }
    }, {
    classMethods: {
      associate : function(models) {
        User.hasMany(model.CalendarItem);
        User.hasMany(model.Todo);
        User.hasMany(model.Tag);
        User.hasMany(model.Event);
      }
    }
  });
  return User;
};