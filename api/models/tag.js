'use strict';

var db = require('../db');

var Tag = db.define('Tag', {
  name: String,
  color: String
});

Tag.validatesPresenceOf('name', 'color');

Tag.associate = function(models) {
  Tag.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });

  Tag.hasAndBelongsToMany('eventSettings', { model: model.EventSettings });
  Tag.hasAndBelongsToMany('todoSettings', { model: model.Todo });
}

Tag.createTag = function(tName, tColor, userId, cb) {
  models.tag.create({name:tName, color:tColor, user_id:userId}, cb);
};


module.exports = Tag;
