var Schema = require('jugglingdb').Schema
var env = process.env.NODE_ENV || 'development';
var conf = require('./config/orm')[env];

module.exports = new Schema(conf.adapter, conf);
