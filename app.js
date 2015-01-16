'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var cors = require('cors');
var env = process.env.NODE_ENV || 'development';

var routes = require('./routes');
var models = require('./models');
var jwt = require('express-jwt');

var fs = require('fs');

var secret = fs.readFileSync('./secret.key');
var pub = fs.readFileSync('./secret.pub')

var app = express();

app.use(cors());
app.use(jwt({secret: pub}).unless({path: ['/token']}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

routes(app, secret, pub);
models();

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  if (env != 'development') {
    res.status(err.status || err.statusCode || 500).send(err.message || 'internal server error!');
  }
  else {
    res.status(err.status || err.statusCode || 500).send(err);
  }
});


module.exports = app;
