'use strict';

var orm = require('orm');

function getAllTodosOfUser(userId,db,callback){
  db.models.Todo.find({id:userId},function(err,results){
    callback(err,results);
  });
}

function createNewTodo(name,remind_time,email_remind,db,callback){
  var newTodo = {};
  newTodo.name = name;
  newTodo.remind_time = remind_time;
  newTodo.email_remind = email_remind;
  db.models.Todo.create(newTodo,function(err,result){
    callback(err,result);
  });
}

function getTodoById(todoId,db,callback){
  db.models.Todo.get(todoId, funtion(err,result){
    callback(err,result);
  });
}

function editTodoById(todoId,todo,db,callback){
  db.models.Todo.get(todoId, funtion(err,result){
    result[0].name = todo.name;
    result[0].remind_time = todo.remind_time;
    result[0].completed = todo.completed;
    result[0].email_remind = todo.email_remind;
    result[0].lapse_time = todo.lapse_time;
    result[0].parent = todo.parent;
    result[0].save(function(err){
        callback(err);
    });
  });
}

function removeTodoById(todoId,db,callback){
  db.models.Todo.get(todoId, funtion(err,result){
    result[0].remove(function(err){
        callback(err);
    });
  });
}

function getChildrenOfTaskById(todoId,db,callback){
  db.models.Todo.find({parent:todoId},function(err,results){
    callback(err,result);
  });
}

function createNewChildTodo(parent,name,remind_time,email_remind,db,callback){
  var newTodo = {};
  newTodo.name = name;
  newTodo.remind_time = remind_time;
  newTodo.email_remind = email_remind;
  newTodo.parent = parent.id;
  db.models.Todo.create(newTodo,function(err,result){
    callback(err,result);
  });
}

function completeTaskById(todoId,db,callback){
  db.models.Todo.get(todoId, funtion(err,result){
    result[0].completed = true;
    result[0].save(function(err){
        callback(err);
    });
  });
}

function reopenTaskById(todoId,db,callback){
  db.models.Todo.get(todoId, funtion(err,result){
    result[0].completed = false;
    result[0].save(function(err){
        callback(err);
    });
  });
}