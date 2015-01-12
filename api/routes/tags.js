var express = require('express');
var router = express.Router();

router
  .route('/')
    .get(function(req, res, next) {
      console.log(req.user.id);
      res.send(["hello"]);
    })
    .post(function(req, res, nex) {
      req.models.tag.createTag(req.query.name, req.query.color, req.user.id, req.models, function(result) {
        res.send(result);
      });
    });

router
  .route('/:id')
    .get(function(req, res, next) {

    })
    .put(function(req, res, nex) {

    })
    .delete(function(req, res, next) {

    });

module.exports = function(app) {
  app.use('/api/tags', router);
};
