var express = require('express');
var router = express.Router();

router
  .route('/')
    .get(function(req, res, next) {

    })
    .post(function(req, res, next) {

    });

router
  .route('/:id')
    .get(function(req, res, next) {

    })
    .put(function(req, res, next) {

    })
    .delete(function(req, res, next) {

    });

router
  .route('/:id/complete')
    .put(function(req, res, next) {

    });

router
  .route('/:id/reopen')
    .put(function(req, res, next) {

    });

router
  .route('/:id/subtasks')
    .get(function(req, res, next) {

    })
    .post(function(req, res, next) {

    });

router
  .route('/:id/tags')
    .get(function(req, res, next) {

    })
    .put(function(req, res, next) {

    })
    .delete(function(req, res, next) {

    });

module.exports = function(app) {
  app.use('/api/todo', router);
}
