'use strict';

var express = require('express');
var router = express.Router();
var Event = require('../models/event');

router
  .route('/')
    .get(function(req, res, next) {
      Event
        .getForIdentities(req.identities)
        .then(function(events){
          return events.mapThen(function(event){
            return event.render().then(function(event){
              return event;
            });
          });
        })
        .then(function(events){
          res.send(events);
        });
    })
    .post(function(req, res, next) {
      var subject = { id: body.identity_id, tableName: 'identities'};
      var authorizee = { id: user.id, tableName: 'users'};
      Permission
        .authorize({ subject: subject, authorizee: authorizee, owner: true})
        .then(function(){
          return Event
            .createEvent(req.body)
        }).then(function(event){
          return event.render();
        })
        .then(function(event){
          res.send(event);
        })
        .catch(function(err){
          next(err);
        });
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
