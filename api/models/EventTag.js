"use strict";

module.exports = function(sequelize, DataTypes){
  var EventTag = Sequelize.define('EventTag', {
    classMethods: {
      associate: function(models) {
        EventTag.belongsTo(models.Event)
        EventTag.belongsTo(models.Tag)
      }
    }
  });
  
  return EventTag;
}