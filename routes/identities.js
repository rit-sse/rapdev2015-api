var express = require('express');
var router = express.Router();
var Identity = require('../models/identity');

router
  .route('/')
    .get(function(req, res, next) {
       Identity
        .fetchAll()
        .then(function(models){
          res.send(models);
        });
    })
    .post(function(req, res, next) {
      Identity.createIdentity(req.body.name,req.body.singular, req.user)
      .then(function(result) {
        res.send(result);
      });
    });

router
  .route('/:id')
    .get(function(req, res, next) {
      Identity
        .query({where: {id: req.params.id}})
        .fetch()
        .returnIdentity(req.params.id, function(model){
          res.send(model);
        })
      })
    .put(function(req, res, next) {
      Identity
        .where({id: req.params.id})
        .fetch()
        .set({
          name: req.body.name,
          singular: req.body.singular,
          members: []
        });
    })
    .delete(function(req, res, next) {
      Identity
        .query({where: {id: req.params.id}})
        .fetch()
        .destroy()
        .then(function(){
          res.send(204);
        });
      });

module.exports = function(app) {
  app.use('/api/identities', router);
}