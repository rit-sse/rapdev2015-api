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
      case 'refresh_token': {
        var token;
        if (req.headers && req.headers.authorization) {
          var parts = req.headers.authorization.split(' ');
          if (parts.length == 2) {
            var scheme = parts[0];
            var credentials = parts[1];

            if (/^Bearer$/i.test(scheme)) {
              token = credentials;
            }
          } else {
            return res.send({error: 'bad authorization header format'}); //bad format
          }
        }
        
        if (!token) {
          return res.send({error: 'couldn\'t find token in authorization header'}); //no token
        }
        
        jwt.verify(token, secret, {}, function(err, decoded) {
          if (err) return res.send({error: 'invalid token'});

          var response = jwt.sign(decoded, secret, {expiresInMinutes: expiresIn});

          res.statusCode = 200;
          res.send({token: response, exp: new Date((new Date()).getTime() + expiresIn*60000) });
        });
        break;
      }
      case 'facebook': {
          rq('https://graph.facebook.com/me?access_token='+req.param('token')).then(function(resp) {
            resp = JSON.parse(resp);
            var email = resp.email;
            var uid = resp.id;
            var timezone = resp.timezone;
            var fname = resp.first_name;
            var lname = resp.last_name;
            if (email && uid && timezone && fname && lname) {
              req.models.user.createUser({id: uid, email: email}, provider, req.models, function(user) {
                var response = jwt.sign(user, secret, {expiresInMinutes: expiresIn});

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
