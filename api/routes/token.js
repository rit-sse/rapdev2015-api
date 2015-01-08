'use strict';

var express = require('express');
var jwt = require('jsonwebtoken');

module.exports = function(app, secret) {
    var router = express.Router();
    app.use('/token', router);

    router.route('/').get(function getToken(req, res, next){
        var token = jwt.sign({ foo: 'bar' }, secret);
    });    
    
    return router;
};