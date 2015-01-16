'use strict';

var bookshelf = require('../db');
var checkit = require('checkit');
var Promise = require('bluebird');

var User = bookshelf.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  initialize: function() {
    this.on('saving', this.validate);
  },

  validate: function() {
    return checkit({
      preferredEmail: ['required', 'unique']
    }).run(this.attributes);
  },

  permissions: function() {
    return this.morphMany('Permission', 'authorizee');
  },

  settings: function() {
    return this.belongsToMany('Settings');
  },

  authMethods: function() {
    return this.hasMany('AuthMethod');
  }
}, {
  createUser: function(authId, type, email) {
    var am = { authId: authId, type: type };
    var AuthMethod = bookshelf.model('AuthMethod');

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

module.exports = bookshelf.model('User', User);
