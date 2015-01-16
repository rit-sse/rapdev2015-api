var express = require('express');
var router = express.Router();

router
  .route('/')
    .get(function(req, res, next) {
      var userid = req.user.id;
    })
    .post(function(req, res, next) {
      var userid = req.user.id;
      console.log(req.body); 
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
