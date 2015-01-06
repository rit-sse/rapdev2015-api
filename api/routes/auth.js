var express = require('express');
var router = express.Router();

router.post('/login', function(req, res, next){

});

router.post('/register', function(req, res, next){

});

router.post('/logout', function(req, res, next){

});

module.exports = function(app) {
  app.use('/api', router);
}
