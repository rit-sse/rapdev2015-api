"use strict";

module.exports = function(sequelize, DataTypes){
  var EventTag = Sequelize.define('TodoTag', {
    classMethods: {
      associate: function(models) {
        TodoTag.belongsTo(models.Todo)
        TodoTag.belongsTo(models.Tag)
      }
    }
  });
  
  return TodoTag;
}