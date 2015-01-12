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
      req.models.tag.find({id:req.params.id}, function(err, tags) {
        if(tags.length == 1) {
          var tag = tags[0];
          res.send({id:tag["id"], name:tag["name"], color:tag["color"]});
        } else {
          res.send({result:"ERROR"});
        }
      });
    })
    .put(function(req, res, nex) {

    })
    .delete(function(req, res, next) {

    });

module.exports = function(app) {
  app.use('/api/tags', router);
};
