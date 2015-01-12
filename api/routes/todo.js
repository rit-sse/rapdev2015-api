var express = require('express');
var router = express.Router();

router
  .route('/')
    .get(function(req, res, next) {
    
      req.todo.getAllTodosOfUser(function(result){
        req.send(result);
      });
    })
    .post(function(req, res, next) {
      var body = req.body;
      req.todo.createNewTodo(body.name,body.dueDate,req,function(result){
        req.send(result);
      });
    });

router
  .route('/:id')
    .get(function(req, res, next) {
      var body = req.body;
      req.todo.getTodoById(body.todoId,req,function(result){
        req.send(result);
      });
    })
    .put(function(req, res, next) {
      var body = req.body
      req.todo.editTodoById(body.todoId,body.todo,req,function(result){
        req.send(result);
      });
    })
    .delete(function(req, res, next) {
      var body = req.body;
      req.todo.removeTodoById(body.todoId,req,function(result){
        req.send(result);
      });
    });

router
  .route('/:id/complete')
    .put(function(req, res, next) {
      req.todo.completeTaskById(req.body.todoId,req,function(result){
        req.send(result);
      });
    });

router
  .route('/:id/reopen')
    .put(function(req, res, next) {
      req.todo.reopenTaskById(req.body.todoId,req,function(result){
        req.send(result);
      });
    });

router
  .route('/:id/subtasks')
    .get(function(req, res, next) {
      req.todo.getChildrenOfTodoById(req.body.todoId,req,function(result){
        req.send(result);
      });
    })
    .post(function(req, res, next) {
      var body = req.body;
      req.todo.createNewChildTodo(body.parent,body.name,body.dueDate,req,function(result){
        req.send(result);
      });
    });

router
  .route('/:id/tags')
    .get(function(req, res, next) {

    })
    .put(function(req, res, next) {

    })
    .delete(function(req, res, next) {

    });

router
  .route('/:id/reminders')
    .get(function(req, res, next) {

    })
    .post(function(req, res, next) {

    })
    .delete(function(req, res, next) {

    });

module.exports = function(app) {
  app.use('/api/todos', router);
}
