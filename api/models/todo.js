'use strict';

var db = require('../db');

var Todo = db.define('Todo', {
  name: String,
  dueDate: Date,
  completed: Boolean,
  elapsedTime: Number
});

Todo.validatesPresenceOf('name', 'completed', 'elapsedTime');

Todo.associate = function(models) {
  Todo.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
  Todo.belongsTo(Todo, { as: 'parent', foreignKey: 'parentId' });

  Todo.hasMany(Todo, { as: 'subtasks', foreignKey: 'parentId' });

  Todo.hasAndBelongsToMany('tags', { model: models.Tag });
}

module.exports = Todo;
