'use strict';

var bookshelf = require('../db');
var checkit = require('checkit');

var User = ('./user');

var AuthMethod = bookshelf.Model.extend({
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
    this.belongsTo(User);
  }

});

module.exports = AuthMethod;
