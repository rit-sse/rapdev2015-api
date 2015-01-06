"use strict";

module.exports = function(sequelize, DataTypes){
  var EventTag = Sequelize.define('TodoTag', {
  id:{type:Sequelize.INTEGER.UNSIGNED,
    allowNull:False,
	autoIncrement:true}
  }, {
    classMethods: {
      associate: function(models) {
		TodoTag.hasOne(models.Todo)
	  }
	  associate: function(models) {
		TodoTag.hasOne(models.Tag)
	  }
    }
  });
  
  return TodoTag;
}