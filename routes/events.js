'use strict';

var express = require('express');
var router = express.Router();
var Event = require('../models/event');
// var EventPermission = require('../models/event-permission');

router
  .route('/')
    .get(function(req, res, next) {
      var user = req.user;
      res.send(user.getEvents());
    })
    .post(function(req, res, next) {
      var user = req.user;
      var event = new Event(req.body);
      this.events.create(event, function(err) {
        if(err) return next(err);
      });
    });

router
  .route('/:id')
    .get(function(req, res, next) {
      req.models.event.findById(req.params.id, function(err, result) {
        if (err) {
          next(err);
        }
        else {
          res.send(result);
        }
      });
    })
    .put(function(req, res, next) {
      req.models.event.updateEvent( req.params.id, req.body.name,
                                    req.body.description, req.body.startTime,
                                    req.body.endTime, function(err, result) {
        if (err) {
          next(err);
        }
        else {
          res.send(result);
        }
      });
    })
    .delete(function(req, res, next) {
      console.log("deleting");
      req.models.event.deleteEvent( req.params.id, function(err) {
        if (err) {
          next(err);
        }
        else {
          res.send(200);
        }
      })
    });

router
  .route('/:id/invite')
    .post(function(req, res, next) {
      req.models.calendarItem.create({email:req.body.email,
                                 accpeted:'Pending',
                                 itemowner_id:req.user.id,
                                 invitedby_id:req.user.id,
                                 event_id:req.params.id},
        function(err, result) {
          if(err) {
          next({error:err, status: 422});
        } else {
          res.send({});
        }
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
  app.use('/api/events', router);
}