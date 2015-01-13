var express = require('express');
var router = express.Router();

router
  .route('/:id/accept')
    .post(function(req, res, next) {
      req.models.invites.get(req.params.id, function(err, invite) {
        invite.accepted = 'Accepted';
        invite.save(invite, function(error) {
          if(err) {
            next(err);
          } else {
            res.send({});
          }
        });
      });
    });

router
  .route('/:id/decline')
    .post(function(req, res, next) {
      req.models.invites.get(req.params.id, function(err, invite) {
        invite.accepted = 'Declined';
        invite.save(invite, function(error) {
          if(err) {
            next(err);
          } else {
            res.send({});
          }
        });
      });
    });

module.exports = function(app) {
  app.use('/api/invites', router);
}
