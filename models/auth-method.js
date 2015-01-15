'use strict';

var bookshelf = require('../db');
var checkit = require('checkit');

var User = require('./user');

var AuthMethod = bookshelf.Model.extend({
  tableName: 'auth_methods',
  initialize: function() {
    this.on('saving', this.validate);
  },

  validate: function() {
    return checkit({
      authId: 'required',
      type: 'required'
    }).run(this.attributes);
  },

  user: function() {
    return this.belongsTo(User);
  }

});

module.exports = AuthMethod;
