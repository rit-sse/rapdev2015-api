'use strict';
var express = require('express');
var router = express.Router();

router
  .route('/')
    .get(function(req, res, next) {
      req.models.event.findAllById(req.user.id,function(err,results){
        console.log(err);
        console.log(results);
        if (err){
          next(err);
        } else {
          res.send(results);
        }
      });
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
  .route('/:id/invite')
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

router
  .route('/:id/reminders')
    .get(function(req, res, next) {

    })
    .post(function(req, res, next) {

    })
    .delete(function(req, res, next) {

    });

module.exports = function(app) {
  app.use('/api/events', router);
}
