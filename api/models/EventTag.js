"use strict";

module.exports = function(sequelize, DataTypes){
  var EventTag = Sequelize.define('EventTag', {
    classMethods: {
      associate: function(models) {
        EventTag.hasOne(models.Event)
        EventTag.hasOne(models.Tag)
      }
    }
  });
  
  return EventTag;
}