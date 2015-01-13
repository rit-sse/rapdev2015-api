var Schema = require('jugglingdb').Schema
var env = process.env.NODE_ENV || 'development';
var conf = require('./config/orm');

var adapter = conf[env].adapter;
delete conf[env].adapter;

module.exports = new Schema(adapter, conf[env])