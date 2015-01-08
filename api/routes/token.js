'use strict';

var express = require('express');
var jwt = require('jsonwebtoken');
var rq = require('request-promise');

var fbAppId = 1654582774769215;
var fbAppSecret = 'b35b4d0bc7e91f472895900a40879851';

module.exports = function(app, secret) {
  var router = express.Router();

  router.route('/').get(function getToken(req, res, next){
    var provider = req.provider;
    var token = req.token;

    var response = jwt.sign({ foo: 'bar' }, secret);

    switch (provider) {
      case 'facebook': {
        rq('graph.facebook.com/debug_token?input_token='+req.param('token')+'access_token='+fbAppId+'|'+fbAppSecret).then(function(resp) {
          console.log(resp);
          if (resp.data && resp.data.app_id == fbAppId && resp.data.is_valid && resp.data.user_id == req.param('user')) {
            res.send(response);
          } else {
            res.send({error: 'Got invalid credntials back from facebook.'});
          }
        }, function() {
          res.send({error: 'Invalid response from facebook'});
        });
      }
    }
  });
  
  app.use('/token', router);

  return router;
};