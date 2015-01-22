'use strict';

var express = require('express');
var router = express.Router();
var Event = require('../models/event');
var Permission = require('../models/permission');

router
  .route('/')
    .get(function(req, res, next) {
      Event
        .getForIdentities(req.identities)
        .then(function(events){
          return Event.collection(events).mapThen(function(event){
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
      var subject = { id: req.body.identity_id, tableName: 'identities'};
      var authorizee = { id: req.user.id, tableName: 'users'};
      Permission
        .authorized({ subject: subject, authorizees: [authorizee], owner: true})
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
      Permission
        .authorizedFor(req.params.id, 'events')
        .then(function(authorizees){
          var subject = { id: req.params.id, tableName: 'events'};
          return Permission
            .authorized({ subject: subject, authorizees: authorizees })
        })
        .then(function(){
          return Event
            .where({id: req.params.id})
            .fetch()
        })
        .then(function(event){
          return event.render()
        })
        .then(function(event){
          res.send(event);
        })
        .catch(function(err){
          next(err);
        });
    })
    .put(function(req, res, next) {
      Permission
        .authorizedFor(req.params.id, 'events')
        .then(function(){
          return Event
            .where({id: req.params.id})
            .fetch()
        })
        .then(function(event){
          return event.set({
              startTime: req.body.startTime,
              endTime: req.body.endTime,
              name: req.body.name,
              description: req.body.description,
            })
            .save();
        })
        .then(function(event){
          return event.render();
        })
        .then(function(event){
          res.send(event);
        })
        .catch(function(err){
          next(err);
        });
    })
    .delete(function(req, res, next) {
      Permission
        .authorizedFor(req.params.id, 'events')
        .then(function(){
          return Event
            .where({id: req.params.id})
            .fetch()
        })
        .then(function(event){
          return event.destroy()
        })
        .then(function(){
          res.status(204).send({});
        })
        .catch(function(err){
          next(err);
        });
    });

router
  .route('/:id/tags/:tid')
    .put(function(req, res, next) {
      Permission
        .authorizedFor(req.params.id, 'events')
        .then(function(){
          return Event
            .where({id: req.params.id})
            .fetch()
        })
        .then(function(event){
          return event
            .owner()
            .then(function(owner){
              return Tag
                .findOrCreateByNameArray([req.params.tid], owner.id)
            })
            .then(function(tags){
              return event.tags().attach(tags);
            });
        })
        .then(function(event){
          return event.render();
        })
        .then(function(event){
          res.send(event);
        });
    })
    .delete(function(req, res, next) {
      Permission
        .authorizedFor(req.params.id, 'events')
        .then(function(){
          return Event
            .where({id: req.params.id})
            .fetch()
        })
        .then(function(event){
          return event
            .owner()
            .then(function(owner){
              return Tag
                .findOrCreateByNameArray([req.params.tid], owner.id)
            })
            .then(function(tags){
              return event.tags().detach(tags);
            });
        })
        .then(function(event){
          return event.render();
        })
        .then(function(event){
          res.send(event);
        });
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
