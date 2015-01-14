'use strict';

var db = require('../db');

var Tag = db.define('Tag', {
  name: String,
  color: String
});

Tag.validatesPresenceOf('name', 'color');

Tag.associate = function(models) {
  Tag.belongsTo(models.Calendar, { as: 'calendar', foreignKey: 'calendarId' });

  Tag.hasMany(models.TagPermission, { as: 'permissions', foreignKey: 'tagId' });

  Tag.hasAndBelongsToMany('events', { model: models.Event });
  Tag.hasAndBelongsToMany('todos', { model: models.Todo });
}

Tag.createTag = function(tName, tColor, userId, cb) {
  models.tag.create({name:tName, color:tColor, user_id:userId}, cb);
};


module.exports = Tag;
