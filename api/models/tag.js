"use strict";

module.exports = function(sequelize, DataTypes){
  var Tag = sequelize.define('Tag', {
    name: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    color: {
      type: DataTypes.STRING(6),
      allowNull: false
    }
  },
  {
    classMethods: {
      associate: function(models) {
        Tag.belongsTo(models.User);
        Tag.belongsToMany(models.Event);
        Tag.belongsToMany(models.Todo);
      }
    }
  });

  return Tag;
}
