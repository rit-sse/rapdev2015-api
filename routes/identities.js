var express = require('express');
var router = express.Router();
var Identity = require('../models/identity');
var Permission = require('../models/permission');
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
        .then(function(identity){
          identity
            .returnIdentity(req.params.id)
              res.send(identity);  
        });
      })
    //double check stuff later
    .put(function(req, res, next) {
      Identity
        .where({id: req.params.id})
        .set({
          name: req.body.name,
          singular: req.body.singular,
        })
        .save()
        .then(function(identity){
          res.send(identity)
        });
    
    })
    .delete(function(req, res, next) {
      Identity
        .where({id: req.params.id})
        .fetch()
        .then(function(identity){
          return identity
            .destroy();
        })
        .then(function(){
          res.status(204).send({});
        })
        .catch(function(err){
          console.log(err);
        });
      });
  router
    .route('/:id/members/:uid')
      .put(function(req,res,next){
        Permission
          .forge({pending: true, type: 'Read', authorizee_id: req.params.uid, authorizee_type: 'users',
                subject_id: req.params.id, subject_type: 'identities'})
          .save()
          .then(function(permission){
            Identity
              .where({id: req.params.id})
              .fetch()
              .then(function(identity){
                  res.send(identity);
              })
          })
      })
      .delete(function(req, res, next){
        Permission
          .where({pending: true, type: 'Read', authorizee_id: req.params.uid, authorizee_type: 'users',
                subject_id: req.params.id, subject_type: 'identities'})
          .fetch()
          .then(function(permission){
            return permission
              .destroy();
          })
          .then(function(){
            res.status(204).send({});
          })
      });

module.exports = function(app) {
  app.use('/api/identities', router);
}