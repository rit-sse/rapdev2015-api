'use strict';

module.exports = function(sequelize, DataTypes) {
  var Event = sequelize.define('Event', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    startTime: DataTypes.DATE,
    endTime: DataTypes.DATE,
  },
  {
    classMethods: {
      associate: function(models) {
        Event.belongsTo(models.User, { foreignKey: 'ownerId' });
        Event.belongsToMany(models.Tag);
        Event.hasMany(models.CalendarItem);
      }
    }
  });

  return Event;
}
