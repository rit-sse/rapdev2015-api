'use strict';

var bookshelf = require('../db');
var checkit = require('checkit');
var Promise = require('bluebird');

var AuthMethod = bookshelf.Model.extend({
  tableName: 'auth_methods',
  hasTimestamps: true,
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
    return this.belongsTo('User');
  }

}, {
  userForAuthMethod: function(authId, type, email) {
    var am = { authId: authId, type: type };
    var User = bookshelf.model('User');

    return AuthMethod.where(am).fetch().then(function(auth){
      if(auth) {
        return auth.related('user').fetch();
      } else {
        return AuthMethod.forge(am).save().then(function(auth){
          return User
            .forge({preferredEmail: email})
            .save()
            .then(function(user) {
              auth.set('user_id', user.id).save();
              return Promise.resolve(user);
            });
        });
      }
    });
  }
});

module.exports = bookshelf.model('AuthMethod', AuthMethod);
