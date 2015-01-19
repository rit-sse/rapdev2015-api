'use strict';

var express = require('express');
var router = express.Router();
var Event = require('../models/event');

router
  .route('/')
    .get(function(req, res, next) {
      var user = req.user;
    })
    .post(function(req, res, next) {
      var user = req.user;
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
  .route('/:id/tags/:tid')
    .put(function(req, res, next) {

    })
    .delete(function(req, res, next) {

    });

router
  .route('/:id/invitees/:iid')
    .put(function(req, res, next) {

    })
    .delete(function(req, res, next) {

    })
    .patch(function(req, res, next) {

    });

router
  .route('/:id/reminders')
    .get(function(req, res, next) {

    })
    .post(function(req, res, next) {

    });

router
  .route('/:id/reminders/:rid')
    .put(function(req, res, next) {

    })
    .delete(function(req, res, next) {

    });

module.exports = function(app) {
  app.use('/api/events', router);
}
