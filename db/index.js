var env = process.env.NODE_ENV || 'development';
var config = require('../knexfile');
var knex = require('knex')(config[env]);

var bookshelf = require('bookshelf')(knex);
bookshelf.plugin('registry');

module.exports = bookshelf;
