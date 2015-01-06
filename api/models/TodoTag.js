"use strict";

module.exports = function(sequelize, DataTypes){
  var EventTag = Sequelize.define('TodoTag', {
    classMethods: {
      associate: function(models) {
        TodoTag.hasOne(models.Todo)
      },
      associate: function(models) {
        TodoTag.hasOne(models.Tag)
      }
    }
  });
  
  return TodoTag;
}