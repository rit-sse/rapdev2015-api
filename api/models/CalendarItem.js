"use strict";

module.exports = function(sequelize, DataTypes) {
  var calendarItem = sequelize.define('CalendarItem', {
    itemOwnerid: {type: Sequelize.INTEGER.UNSIGNED, allowNull: false},
    emailReminder: {type: Sequelize.BOOLEAN},
    event: {type: Sequelize.INTEGER.UNSIGNED, allowNull: false},
    invitedByid: {type: Sequelize.INTEGER.UNSIGNED},
    accepted: {type: Sequelize.ENUM('ACCEPTED', 'PENDING', 'DECLINED')}
  }, {
    classMethods: {
      associate: function(models) {
        calendarItem.itemOwnerid.hasOne(models.User.id)
        calendarItem.event.hasOne(models.Event.id)
        calendarItem.invitedByid.hasOne(models.User.id)
      }
  });

  return calendarItem;
};

