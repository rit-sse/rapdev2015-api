'use strict';

var express = require('express');
var jwt = require('jsonwebtoken');
var rq = require('request-promise');

var expiresIn = 60;

module.exports = function(app, secret) {
  var router = express.Router();

  router.route('/').get(function getToken(req, res, next){
    var provider = req.param('provider');

    res.statusCode = 401;

    switch (provider) {
      case 'facebook': {
          rq('https://graph.facebook.com/me?access_token='+req.param('token')).then(function(resp) {
            resp = JSON.parse(resp);
            var email = resp.email;
            var uid = resp.id;
            var timezone = resp.timezone;
            var fname = resp.first_name;
            var lname = resp.last_name;
            if (email && uid && timezone && fname && lname) {
              req.models.user.createUser({id: uid, email: email}, req.models, function(userId) {
                var response = jwt.sign({ id: userId  }, secret, {expiresInMinutes: expiresIn});

                res.statusCode = 200;
                res.send({token: response, exp: new Date((new Date()).getTime() + expiresIn*60000) });
              });
            } else {
              res.send({error: 'Got invalid credntials back from facebook.'});
            }
          }).catch(function(e) {
            console.log(e);
            res.send({error: 'Invalid response from facebook'});
          });
        break;
      }
      default: {
        res.send({error: 'No valid provider found'});
      }
    }
  });

  app.use('/token', router);

  return router;
};
