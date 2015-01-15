'use strict';

var express = require('express');
var jwt = require('jsonwebtoken');
var rq = require('request-promise');

var User = require('../models/user');

var expiresIn = 60;

module.exports = function(app, secret) {
  var router = express.Router();

  router.route('/').get(function getToken(req, res, next){
    var provider = req.param('provider');
    // console.log(req.user)

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
            return next({error: 'bad authorization header format', status: 401}); //bad format
          }
        }

        if (!token) {
          return next({error: 'couldn\'t find token in authorization header', status: 401}); //no token
        }

        jwt.verify(token, secret, {algorithm: 'RS256'}, function(err, decoded) {
          if (err) return next({error: 'invalid token', status: 401});

          var response = jwt.sign(decoded, secret, {expiresInMinutes: expiresIn, algorithm: 'RS256'});

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
              User.createUser({id: uid, email: email}, provider, next, function(user) {
                // console.log(user);
                var response = jwt.sign(user, secret, {expiresInMinutes: expiresIn, algorithm: 'RS256'});

                res.send({token: response, exp: new Date((new Date()).getTime() + expiresIn*60000) });
              });
            } else {
              next({error: 'Got invalid credntials back from facebook.', status: 401});
            }
          }).catch(function(e) {
            console.log(e);
            next({error: 'Invalid response from facebook', status: 401});
          });
        break;
      }
      default: {
        next({error: 'No valid provider found', status: 401});
      }
    }
  });

  app.use('/token', router);

  return router;
};
