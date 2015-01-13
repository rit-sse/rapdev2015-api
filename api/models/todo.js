'use strict';

var orm = require('orm');

module.exports = function(db, models) {
  var Todo = db.define('todos', {
    name: String,
    dueDate: Date,
    completed: Boolean,
    lapseTime: {
      type: 'number',
      unsigned: true
    }
  }, {
    validations: {
      name: orm.validators.required(),
      completed: orm.validators.required(),
      lapseTime: orm.validators.required()
    }
  });

  Todo.associate = function(models) {
    Todo.hasOne('user', models.user, { reverse: 'todos' })
    Todo.hasOne('parent', Todo, {reverse: 'subtasks'});
  }

  models.todo = Todo;
}
