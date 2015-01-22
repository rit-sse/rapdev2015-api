var express = require('express');
var router = express.Router();
var Promise = require('bluebird');
var Tag = require('../models/tag')
var Permission = require('../models/permission');

var flatten = function(object) {
  return Promise.reduce(object, function(a, b){
    return a.concat(b);
  }, []);
}

router
  .route('/')
    .get(function(req, res, next) {
      Tag
        .getForIdentities(req.identities)
        .then(function(tags){
          return Tag.collection(tags).mapThen(function(tag){
            return tag.render();
          });
        })
        .then(function(tags){
          res.send(tags);
        });
    })

    .post(function(req, res, next) {
      var subject = { id: req.body.identity_id, tableName: 'identities'};
      var authorizee = { id: req.user.id, tableName: 'users'};
      Permission
        .authorized({ subject: subject, authorizee: authorizee, owner: true})
        .then(function(){
          return Tag.findOrCreateByNameArray([{
            name: req.body.name,
            color: req.body.color,
            visibility: req.body.visibility
          }], req.body.identity_id)
        })
        .then(function(tag){
          res.send(tag);
        });
    });

router
  .route('/:id')
    .get(function(req, res, next) { //TODO: Add public tag
      Promise.map(req.identites, function(identity) {
        return identity.tagPermissions().then(function(permissions) {
          return permissions;
        });
      })
      .then(flatten)
      .then(function(tagPermissions) {
        return Promise.map(tagPermissions, function(permission){
          return permission.related('subject').fetch().then(function(subject) {
           return subject;
          })
        });
      })
      .then(flatten)
      .then(function(tags) {
        tags.forEach(function(tag) {
          if(tag.id == req.body.id) {
            res.send(tag);
          }
        });
      });
      next({status:401, message:'No access to tag'});
    })
    .put(function(req, res, next) {
      Promise.map(req.identites, function(identity) {
        return identity.tagPermissions().then(function(permissions) {
          return permissions;
        });
      })
      .then(flatten)
      .then(function(tagPermissions) {
        return Promise.map(tagPermissions, function(permission){
          return permission.related('subject').fetch().then(function(subject) {
           return subject;
          })
        });
      })
      .then(flatten)
      .then(function(tags) {
        tags.forEach(function(tag) {
          if(tag.id == req.body.id) {
            tag.save({name:req.body.name, color:req.body.color, visibility:req.body.visibility});
          }
        });
      });

      next({status:401, message:'No access to tag'});
    })
    .delete(function(req, res, next) {
      Promise.map(req.identites, function(identity) {
        return identity.tagPermissions().then(function(permissions) {
          return permissions;
        });
      })
      .then(flatten)
      .then(function(tagPermissions) {
        return Promise.map(tagPermissions, function(permission){
          return permission.related('subject').fetch().then(function(subject) {
           return subject;
          })
        });
      })
      .then(flatten)
      .then(function(tags) {
        tags.forEach(function(tag) {
          if(tag.id == req.body.id) {
            tag.destroy();
          }
        });
      });
      next({status:401, message:'No access to tag'});

    });

module.exports = function(app) {
  app.use('/api/tags', router);
};
