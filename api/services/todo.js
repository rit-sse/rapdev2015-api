'use strict';

var orm = require('orm');


module.exports = {
  getAllTodosOfUser : function(userId,request,callback){
    request.models.todo.find({user_id:request.user.id},function(err,results){
      callback(err,results);
    });
  },

  createNewTodo : function(name,dueDate,request,callback){
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

  getTodoById : function(todoId,results,callback){
    results.models.todo.get(todoId, funtion(err,result){
      callback(err,result);
    });
  },

  editTodoById : function(todoId,todo,request,callback){
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

  removeTodoById : function(todoId,request,callback){
    db.models.Todo.get(todoId, funtion(err,result){
      result.remove(function(err){
          callback(err);
      });
    });
  },

  getChildrenOfTaskById : function(todoId,request,callback){
    request.models.todo.find({parent:todoId},function(err,results){
      callback(err,result);
    });
  },

  createNewChildTodo : function(parent,name,dueDate,request,callback){
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

  completeTaskById : function(todoId,request,callback){
    request.models.todo.get(todoId, funtion(err,result){
      result.completed = true;
      result.save(function(err){
          callback(err);
      });
    });
  },

  reopenTaskById : function(todoId,request,callback){
    request.models.todo.get(todoId, funtion(err,result){
      result.completed = false;
      result.save(function(err){
          callback(err);
      });
    });
  }
};