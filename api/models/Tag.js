"use strict";

module.exports = function(sequelize, DataTypes){
  id:{type:Sequelize.INTEGER.UNSIGNED,
    allowNull:False,
	autoIncrement:true}
  name:{type.Sequelize.STRING(32),
  allowNull:False}
  color:{type.Sequelize.STRING(6),
  allowNull:False}
  }, {
    classMethods: {
      associate: function(models) {
		Tag.hasOne(models.User)
	  }
    }
  });
  
  return Tag;
}