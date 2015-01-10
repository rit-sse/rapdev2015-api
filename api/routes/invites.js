var express = require('express');
var router = express.Router();

router
  .route('/:id/accept')
    .post(function(req, res, next) {

    });

router
  .route('/:id/decline')
    .post(function(req, res, next) {

    });

module.exports = function(app) {
  app.use('/api/invites', router);
}
