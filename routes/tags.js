var express = require('express');
var router = express.Router();

router
  .route('/')
    .get(function(req, res, next) {
      console.log(req.user);
      res.send(req.user);
      // req.models.tag.find({user_id: req.user.id}, function(err, tags) {
      //   res.send(tags);
      // });
    })
    .post(function(req, res, next) {
      // req.models.tag.createTag(req.body.name, req.body.color, req.user.id, function(err, result) {
      //   if (err) {
      //     next(err);
      //   }
      //   else {
      //     res.send(result);
      //   }
      // });
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
        if (err) {
          next({error: err, status: 422});
        }
        else {
          tag.name = req.body.name || tag.name;
          tag.color = req.body.color || tag.color;
          tag.save(function(err) {
            if(err) {
              next({error: err, status: 422});
            } else {
              res.send(tag);
            }
          });
        }
      });

    })
    .delete(function(req, res, next) {
      req.models.tag.get(req.params.id, function(err, tag) {
        tag.remove(function(err) {
          if(err) {
            next({error: err, status: 422});
          } else {
            res.status(204).send({});
          }
        });
      });
    });

module.exports = function(app) {
  app.use('/api/tags', router);
};
