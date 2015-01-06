'use strict';

module.exports = function(sequelize, DataTypes) {
  var calendarItem = sequelize.define('CalendarItem', {
    emailReminder: {
      type: DataTypes.BOOLEAN
    },
    accepted: {
      type: DataTypes.ENUM('ACCEPTED', 'PENDING', 'DECLINED')
    }
  }, {
    classMethods: {
      associate: function(models) {
        calendarItem.belongsTo(models.User, {foreignKey: 'ItemOwnerId'});
        calendarItem.belongsTo(models.Event);
        calendarItem.belongsTo(models.User, {foreignKey: 'InvitedById'});
      }
    }
  });

  return calendarItem;
};

