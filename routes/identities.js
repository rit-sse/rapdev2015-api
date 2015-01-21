var express = require('express');
var router = express.Router();
var Identity = require('../models/identity');
var Permission = require('../models/permission');
router
  .route('/')
    .get(function(req, res, next) {
      req.identities.mapThen(function(identity){
        return identity.render();
      }).then(function(identities){
        res.send(identities);
      })
    })
    .post(function(req, res, next) {
      Identity.createIdentity(req.body.name,req.body.singular, req.user)
      .then(function(result) {
        return result.render();
      })
      .then(function(identity){
        res.send(identity)
      })
      .catch(function(err){
        next({status: 422, error: err});
      });
    });

router
  .route('/:id')
    .get(function(req, res, next) {
      Identity
        .where({ id: req.params.id})
        .fetch()
        .then(function(result) {
          if(result) {
            return result.render();
          } else {
            return Promise.reject({ status: 404, message: 'Identity not found'})
          }
        })
        .then(function(identity){
          res.send(identity)
        })
        .catch(function(err){
          next(err);
        })
      })
    .put(function(req, res, next) {
      Identity
        .where({id: req.params.id})
        .fetch()
        .then(function(identity){
          var obj = { singular: req.body.singular};
          if(req.body.name !== identity.get('name')) {
            obj.name = req.body.name;
          }
          return identity.set(obj).save()
        })
        .then(function(result) {
          return result.render();
        })
        .then(function(identity){
          res.send(identity)
        })
        .catch(function(err){
          next({status: 422, error: err});
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
              .then(function(result) {
                return result.render();
              })
              .then(function(identity){
                res.send(identity)
              });
          })
          .catch(function(err){
            next({status: 422, error: err});
          });
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
