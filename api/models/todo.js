'use strict';

var orm = require('orm');

module.exports = function(db, models) {
  var Todo = db.define('todos', {
    name: String,
    remindTime: Date,
    dueDate: Date,
    completed: Boolean,
    emailReminder: Boolean,
    lapseTime: {
      type: 'number',
      unsigned: true
    }
  }, {
    validations: {
      name: orm.validators.required(),
      remindTime: orm.validators.required(),
      completed: orm.validators.required(),
      emailRemind: orm.validators.required(),
      lapseTime: orm.validators.required()
    }
  });

  Todo.associate = function(models) {
    Todo.hasOne('user', models.user, { reverse: 'todos' })
    Todo.hasOne('parent', Todo, {reverse: 'subtasks'});
  }

  models.todo = Todo;
}
