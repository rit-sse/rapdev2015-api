var express = require('express');
var router = express.Router();

router
  .route('/')
    .get(function(req, res, next) {
      req.models.todo.getAllTodosOfUser(req.models,req.user,function(err,result){
        res.send(result);
      });
    })
    .post(function(req, res, next) {
      var body = req.body;
      req.models.todo.createNewTodo(body.name,body.dueDate,req.model,req.user,function(err,result){
        res.send(result);
      });
    });

router
  .route('/:id')
    .get(function(req, res, next) {
      var body = req.body;
      req.models.todo.getTodoById(req.params.id,req.model,function(err,result){
        res.send(result);
      });
    })
    .put(function(req, res, next) {
      var body = req.body;
      console.log(body);
      req.models.todo.editTodoById(req.params.id,body.todo,req.model,function(err,result){
        res.send(result);
      });
    })
    .delete(function(req, res, next) {
      var body = req.body;
      req.models.todo.removeTodoById(req.params.id,req.model,function(err){
        res.send(err);
      });
    });

router
  .route('/:id/complete')
    .put(function(req, res, next) {
      req.models.todo.completeTaskById(req.params.id,req.model,function(err){
        res.send(err);
      });
    });

router
  .route('/:id/reopen')
    .put(function(req, res, next) {
      req.models.todo.reopenTaskById(req.params.id,req.model,function(err){
        res.send(err);
      });
    });

router
  .route('/:id/subtasks')
    .get(function(req, res, next) {
      req.models.todo.getChildrenOfTodoById(req.params.id,req.model,function(result){
        res.send(result);
      });
    })
    .post(function(req, res, next) {
      var body = req.body;
      req.models.todo.createNewChildTodo(body.parent,body.name,body.dueDate,req.model,function(result){
        res.send(result);
      });
    });

router
  .route('/:id/tags')
    .get(function(req, res, next) {

    });

router
  .route('/id/tags/add')
    .put(function(req, res, next) {

    });

router
  .route('/id/tags/delete')
    .put(function(req, res, next) {

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
