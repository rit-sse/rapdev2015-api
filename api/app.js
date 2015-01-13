'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var orm = require('orm');
var cors = require('cors');
var env = process.env.NODE_ENV || 'development';
var ormOpts = require('./config/orm.json')[env];

var routes = require('./routes');
var models = require('./models');
var jwt = require('express-jwt');

var secret = 'SUPAH SEKRIT SECRET';

var app = express();

app.use(cors());
app.use(jwt({secret: secret}).unless({path: ['/token']}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(orm.express(ormOpts, {
  define: function (db, m) {
    models.load(db, m);
    db.sync();
  }
}));

routes(app, secret);

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
    res.status(err.status || 500).send(err.message ||'internal server error!');
  }
  else {
    res.status(err.status).send(err);
  }
});


module.exports = app;
