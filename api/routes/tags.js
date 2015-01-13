var express = require('express');
var router = express.Router();

router
  .route('/')
    .get(function(req, res, next) {
      req.models.tag.find({user_id: req.user.id}, function(err, tags) {
        res.send(tags);
      });
    })
    .post(function(req, res, next) {
      req.models.tag.createTag(req.body.name, req.body.color, req.user.id, req.models, function(result) {
        res.send(result);
      });
    });

router
  .route('/:id')
    .get(function(req, res, next) {
      req.models.tag.get(req.params.id, function(err, tag) {
          if(err) {
            next({error: err, status: 422});
          } else {
            res.send(tag);
          }
      });
    })
    .put(function(req, res, next) {
      req.models.tag.get(req.params.id, function(err, tag) {
        tag.name = req.body.name || tag.name;
        tag.color = req.body.color || tag.color;
        tag.save(req, function(err) {
          if(err) {
            next({error: err, status: 422});
          } else {
            res.send(tag);
          }
        });
      });

    })
    .delete(function(req, res, next) {
      req.models.tag.get(req.params.id, function(err, tag) {
        tag.remove(function(err) {
          if(err) {
            next({error: err, status: 422});
          } else {
            res.send({result:"SUCCESS"});
          }
        });
      });
    });

module.exports = function(app) {
  app.use('/api/tags', router);
};
