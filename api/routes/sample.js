"use strict";

var express = require('express');
var router = express.Router();
var sampleController = require('../controllers/sample.js');

router.route('/hello')
.get(sampleController.hello)

module.exports = router;