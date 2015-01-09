'use strict';

var orm = require('orm');


module.exports = {
  getAllTodosOfUser : function(userId,db,callback){
    db.models.Todo.find({id:userId},function(err,results){
      callback(err,results);
    });
  },

  createNewTodo : function(name,remind_time,email_remind,db,callback){
    var newTodo = {};
    newTodo.name = name;
    newTodo.remind_time = remind_time;
    newTodo.email_remind = email_remind;
    db.models.Todo.create(newTodo,function(err,result){
      callback(err,result);
    });
  },

  getTodoById : function(todoId,db,callback){
    db.models.Todo.get(todoId, funtion(err,result){
      callback(err,result);
    });
  },

  editTodoById : function(todoId,todo,db,callback){
    db.models.Todo.get(todoId, funtion(err,result){
      result.name = todo.name;
      result.remind_time = todo.remind_time;
      result.completed = todo.completed;
      result.email_remind = todo.email_remind;
      result.lapse_time = todo.lapse_time;
      result.parent = todo.parent;
      result.save(function(err){
          callback(err);
      });
    });
  },

  removeTodoById : function(todoId,db,callback){
    db.models.Todo.get(todoId, funtion(err,result){
      result.remove(function(err){
          callback(err);
      });
    });
  },

  getChildrenOfTaskById : function(todoId,db,callback){
    db.models.Todo.find({parent:todoId},function(err,results){
      callback(err,result);
    });
  },

  createNewChildTodo : function(parent,name,remind_time,email_remind,db,callback){
    var newTodo = {};
    newTodo.name = name;
    newTodo.remind_time = remind_time;
    newTodo.email_remind = email_remind;
    newTodo.parent = parent.id;
    db.models.Todo.create(newTodo,function(err,result){
      callback(err,result);
    });
  },

  completeTaskById : function(todoId,db,callback){
    db.models.Todo.get(todoId, funtion(err,result){
      result.completed = true;
      result.save(function(err){
          callback(err);
      });
    });
  },

  reopenTaskById : function(todoId,db,callback){
    db.models.Todo.get(todoId, funtion(err,result){
      result.completed = false;
      result.save(function(err){
          callback(err);
      });
    });
  }
};