"use strict";

module.exports = function(sequelize, DataTypes){
  name:{
    type.Sequelize.STRING(32),
    allowNull:False
  },
  color:{
    type.Sequelize.STRING(6),
    allowNull:False
  }
  }, {
    classMethods: {
      associate: function(models) {
        Tag.belongsTo(models.User)
        Tag.belongsToMany(model.Event)
        Tag.belongsToMany(model.Todo)
      }
    }
  });
  
  return Tag;
}