var express = require('express');
var router = express.Router();
var Promise = require('bluebird');

var flatten = function(object) {
  return Promise.reduce(object, function(a,b) {
    return a.concat(b);
  }, []);
}

router
  .route('/')
    .get(function(req, res, next) {
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
        res.send(tags);
      });
    })

    .post(function(req, res, next) {
      var userid = req.user.id;
      var identityid = req.body.identityId;
      Identity({id:identityid}).fetch({require:true, withRelated:['permissions']}).then(function(model){
        model.related('permissions').where({authorizee_id:userid, authorizee_type:'users'}).then(function(permission) {
          if(permission.id) {
            new Tag().save({name:req.body.name, color:req.body.color, visibility:req.body.visibility}).then(function(newTag) {
              new Permission({subject_id:newTag.id, subject_type:'tags', authorizee_id:identityid, authorizee_type:'identities'}).save().then(function() {
                res.send(newTag);
              });
            });

          } else {
            next(); //TODO: handle "properly"
          }
        });
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

module.exports = function(app) {
  app.use('/api/tags', router);
};
