var express = require('express');
var router = express.Router();

router
  .route('/')
    .get(function(req, res, next) {
      req.models.user.listUsers("", "", function(err, result) {
        if (err) {
          next(err);
        }
        res.send(result);
      });
    })
    .post(function(req, res, nex) {

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
  app.use('/api/users', router);
};
