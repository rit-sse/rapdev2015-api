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
  
  Todo.getAllTodosOfUser = function(request,callback){
    request.models.todo.find({user_id:request.user.id},function(err,results){
      callback(err,results);
    });
  },

  Todo.createNewTodo = function(name,dueDate,request,callback){
    var newTodo = {};
    newTodo.name = name;
    newTodo.dueDate = dueDate;
    newTodo.completed = false;
    newTodo.lapseTime = 0;
    db.models.todo.create(newTodo,function(err,result){
      newTodo.setUser(request.user.id);
      result.save(function(err){
          callback(err,result);
      });
    });
  },

  Todo.getTodoById = function(todoId,results,callback){
    results.models.todo.get(todoId, funtion(err,result){
      callback(err,result);
    });
  },

  Todo.editTodoById = function(todoId,todo,request,callback){
    request.models.todo.get(todoId, funtion(err,result){
      newTodo.name = todo.name;
      newTodo.dueDate = todo.dueDate;
      newTodo.completed = todo.completed;
      newTodo.lapseTime = todo.lapseTime;
      result.save(function(err){
        newTodo.setParent(todo.getParent());
        newTodo.setUser(todo.getUser());
        result.save(function(err){
          callback(err,result);
        }
      });
    });
  },

  Todo.removeTodoById = function(todoId,request,callback){
    db.models.Todo.get(todoId, funtion(err,result){
      result.remove(function(err){
          callback(err);
      });
    });
  },

  Todo.getChildrenOfTodoById = function(todoId,request,callback){
    request.models.todo.find({parent:todoId},function(err,results){
      callback(err,result);
    });
  },

  Todo.createNewChildTodo = function(parent,name,dueDate,request,callback){
    var newTodo = {};
    newTodo.name = name;
    newTodo.dueDate = dueDate;
    newTodo.completed = false;
    newTodo.lapseTime = 0;
    request.models.todo.create(newTodo,function(err,result){
      newTodo.setUser(request.user.id);
      newTodo.setParent(parent);
      result.save(function(err){
          callback(err,result);
      });
    });
  },

  Todo.completeTaskById = function(todoId,request,callback){
    request.models.todo.get(todoId, funtion(err,result){
      result.completed = true;
      result.save(function(err){
          callback(err);
      });
    });
  },

  Todo.reopenTaskById = function(todoId,request,callback){
    request.models.todo.get(todoId, funtion(err,result){
      result.completed = false;
      result.save(function(err){
          callback(err);
      });
    });
  }
  
  models.todo = Todo;
}
