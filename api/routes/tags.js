var express = require('express');
var router = express.Router();

router
  .route('/')
    .get(function(req, res, next) {
      req.models.tag.find({user_id: req.user.id}, function(err, tags) {
        var userTags = []
        for(var i = 0; i < tags.length; i++) {
          var tag = tags[i];
          userTags.push({id:tag["id"], name:tag["name"], color:tag["color"]});
        }
        res.send(userTags);
      });
    })
    .post(function(req, res, nex) {
      req.models.tag.createTag(req.query.name, req.query.color, req.user.id, req.models, function(result) {
        res.send(result);
      });
    });

router
  .route('/:id')
    .get(function(req, res, next) {
      console.log(req.params.id);
      req.models.tag.get(req.params.id, function(err, tag) {
          res.send({id:tag["id"], name:tag["name"], color:tag["color"]});
      });
    })
    .put(function(req, res, nex) {
      console.log(req.body);
      req.models.tag.get(req.params.id, function(err, Tag) {
        var newName = req.body.name;
        var newColor = req.body.color;
        Tag.save({name:newName, color:newColor}, function(err) {
          if(err) {
            res.send({status:"ERROR"});
          } else {
            res.send({status:"SUCCESS"});
          }
        });
      });
      
    })
    .delete(function(req, res, next) {

    });

module.exports = function(app) {
  app.use('/api/tags', router);
};
