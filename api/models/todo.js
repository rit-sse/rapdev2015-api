'use strict';

var db = require('../db');

var Todo = db.define('todos', {
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
  Todo.hasMany(models.TodoReminder, { as: 'reminders', foreignKey: 'todoId' });
}

module.exports = Todo;
