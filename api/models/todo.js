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
  
  Todo.getAllTodosOfUser = function(models,user,callback){
    models.todo.find({user_id:user.id.user_id},function(err,results){
      callback(err,results);
    });
  },

  Todo.createNewTodo = function(name,dueDate,models,user,callback){
    var newTodo = {};
    newTodo.name = name;
    newTodo.dueDate = dueDate;
    newTodo.completed = false;
    newTodo.lapseTime = 0;
    models.todo.create(newTodo,function(err,result){
      result.user_id = (user.id.user_id);
      result.save(function(err){
          callback(err,result);
      });
    });
  },

  Todo.getTodoById = function(todoId,models,callback){
    console.log(todoId);
    models.todo.get(todoId, function(err,result){
      console.log(result)
      callback(err,result);
    });
  },

  Todo.editTodoById = function(todoId,todo,models,callback){
    models.todo.get(todoId, function(err,result){
      result.name = todo.name;
      result.dueDate = todo.dueDate;
      result.completed = todo.completed;
      result.lapseTime = todo.lapseTime;
      result.setParent(todo.getParent());
      result.setUser(todo.getUser());
      result.save(function(err){
        callback(err,result);
      });
    });
  },

  Todo.removeTodoById = function(todoId,models,callback){
    models.todo.get(todoId, function(err,result){
      result.remove(function(err){
          callback(err);
      });
    });
  },

  Todo.getChildrenOfTodoById = function(todoId,models,callback){
    models.todo.find({parent:todoId},function(err,results){
      callback(err,result);
    });
  },

  Todo.createNewChildTodo = function(parent,name,dueDate,models,usercallback){
    var newTodo = {};
    newTodo.name = name;
    newTodo.dueDate = dueDate;
    newTodo.completed = false;
    newTodo.lapseTime = 0;
    models.todo.create(newTodo,function(err,result){
      newTodo.setUser(user.id);
      newTodo.setParent(parent);
      result.save(function(err){
          callback(err,result);
      });
    });
  },

  Todo.completeTaskById = function(todoId,models,callback){
    models.todo.get(todoId, function(err,result){
      result.completed = true;
      result.save(function(err){
          callback(err);
      });
    });
  },

  Todo.reopenTaskById = function(todoId,request,callback){
    request.models.todo.get(todoId, function(err,result){
      result.completed = false;
      result.save(function(err){
          callback(err);
      });
    });
  }
  
  models.todo = Todo;
}
