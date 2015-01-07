"use strict";

var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var favicon = require('serve-favicon');
var orm = require('orm');
var env = process.env.NODE_ENV || "development";
var ormOpts = require('./config/orm.json')[env];

var routes = require('./routes');
var models = require('./models');

var app = express();

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(orm.express(ormOpts, {
  define: function (db, m) {
    models.load(db, m);
    db.sync();
  }
}));

routes(app);

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500).send('Error!');
});

module.exports = app;
