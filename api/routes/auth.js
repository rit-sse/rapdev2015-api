var express = require('express');
var router = express.Router();

router
  .route('/login')
    .post(function(req, res, next) {

    });

router
  .route('/register')
    .post(function(req, res, next) {

    });

router
  .route('/logout')
    .post(function(req, res, next) {

    });

router
  .route('/users')
    .get(function(req, res, next) {

    });


module.exports = function(app) {
  app.use('/api', router);
}
