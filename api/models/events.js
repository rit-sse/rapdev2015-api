'use strict';

module.exports = function(sequelize, DataTypes) {
  var Event = sequelize.define('Event', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
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
    },
    validate: {
      startTimeBeforeEndTime: function() {
        if(this.startTime > this.endTime) {
          throw new Error('Start time needs to be before end time');
        }
      }
    }
  });

  return Event;
}
