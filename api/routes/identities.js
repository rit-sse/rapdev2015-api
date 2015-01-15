var express = require('express');
var router = express.Router();
var Identity = require('../models/identity');

router
  .route('/')
    .get(function(req, res, next) {
       Identity
        .fetchAll()
        .then(function(model){
          res.send(model);
        })
    })
    .post(function(req, res, next) {
      Identity.createIdentity(req.body.name,req.body.singular, req.user, function(result) {
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
      Identity.find(req.params.id, function(err, result){
        if (err) {
          next(err);
        }
        else {
          identity.updateAttributes({
            name: req.body.name,
            singular: req.body.singular,
            members: req.body.members

          });
        }
      })   

    })
    .delete(function(req, res, next) {
      Identity.find(req.params.id, function(err, result){
        if (err) {
          next(err);
        }
        else {
          result.destroy(function(err){
            if(err){
              next(err);
            } else {
              res.status(204).send({});
            }
          })
        }
      })
    });

module.exports = function(app) {
  app.use('/api/identities', router);
};
