'use strict';

var db = require('../db');

var Todo = db.define('Todo', {
  name: String,
  dueDate: Date,
  completed: Boolean,
  elapsedTime: Number
});

Todo.validatesPresenceOf('name', 'completed', 'elapsedTime');

Todo.associate = function() {
  Todo.belongsTo(db.models.Identity, { as: 'identity', foreignKey: 'identityId' });
  Todo.belongsTo(Todo, { as: 'parent', foreignKey: 'parentId' });

  Todo.hasMany(Todo, { as: 'subtasks', foreignKey: 'parentId' });
  Todo.hasMany(db.models.TodoSettings, { as: 'settings', foreignKey: 'todoId' });

  Todo.hasAndBelongsToMany('tags', { model: db.models.Tag });
}

module.exports = Todo;
