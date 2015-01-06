"use strict";

var express = require('express');
var router = express.Router();


router.get('/hello', function(req, res, next) {

});

router.route('/')
  .get(function(req, res, next){})
  .post(function(req, res, next){});

module.exports = router;
