'use strict';

var db = require('../db');

var Tag = db.define('Tag', {
  name: String,
  color: String,
  visibility: ['Private', 'Public']
});

Tag.validatesPresenceOf('name', 'color');

Tag.associate = function() {
  Tag.hasMany(db.models.TagPermission, { as: 'permissions', foreignKey: 'tagId' });

  Tag.hasAndBelongsToMany('events', { model: db.models.Event });
  Tag.hasAndBelongsToMany('todos', { model: db.models.Todo });
}

Tag.createTag = function(tName, tColor, userId, cb) {
  models.tag.create({name:tName, color:tColor, user_id:userId}, cb);
};


module.exports = Tag;
