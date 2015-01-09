'use strict';

var express = require('express');
var jwt = require('jsonwebtoken');
var rq = require('request-promise');

var fbAppId = '1654582774769215';
var fbAppSecret = 'b35b4d0bc7e91f472895900a40879851';
var expiresIn = 60;

module.exports = function(app, secret) {
  var router = express.Router();

  router.route('/').get(function getToken(req, res, next){
    var provider = req.param('provider');

    var response = jwt.sign({ foo: 'bar' }, secret, {expiresInMinutes: expiresIn}); //TODO: store user session-type stuff in token (for example, associated db user)
    res.statusCode = 401;
    
    switch (provider) {
      case 'facebook': {
        rq('https://graph.facebook.com/oauth/access_token?client_id='+fbAppId+'&client_secret='+fbAppSecret+'&grant_type=client_credentials')
        .then(function(access_token) {
          return rq('https://graph.facebook.com/debug_token?input_token='+req.param('token')+'&'+access_token).then(function(resp) {
            resp = JSON.parse(resp);
            if ((resp.data.app_id == fbAppId) && resp.data.is_valid && (resp.data.user_id == req.param('user'))) {
              res.statusCode = 200;
              res.send({token: response, exp: new Date((new Date()).getTime() + expiresIn*60000) });
            } else {
              res.send({error: 'Got invalid credntials back from facebook.'});
            }
          }).catch(function(e) {
            console.log(e);
            res.send({error: 'Invalid response from facebook'});
          });
        }).catch(function(e) {
          console.log('Couldn\'t get an app access token from facebook!');
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