"use strict";

module.exports = function (sequelize, DataTypes) {
  var Todo = sequelize.define("Todo", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    remind_time: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    email_remind: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    lapse_time: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    }
  },
  {
    classMethods: {
      associate: function (models) {
        Todo.belongsTo(models.User);
        Todo.belongsTo(models.Todo, {as: 'parent'});
        Todo.hasMany(models.Tag);
      },

    }
  });
  return Todo;
}
