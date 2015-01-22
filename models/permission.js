'use strict';

var bookshelf = require('../db');
var checkit = require('checkit');
var validators = require('./validators');
var Promise = require('bluebird');

var Permission = bookshelf.Model.extend({
  tableName: 'permissions',
  hasTimestamps: true,
  initialize: function() {
    this.on('saving', this.validate);
  },

  validate: function() {
    return checkit({
      pending: 'required',
      type: ['required', validators.includes(['Read', 'Owner'])]
    }).run(this.attributes);
  },

  subject: function() {
    return this.morphTo('subject', 'Event', 'Identity', 'Tag');
  },

  authorizee: function() {
    return this.morphTo('authorizee', 'Identity', 'User');
  }
}, {
  authorized: function(obj) {
    return Promise.reduce(obj.authorizees, function(authorized, authorizee){
      var query = { subject_id: obj.subject.id,
                      subject_type: obj.subject.tableName,
                      authorizee_type: authorizee.tableName,
                      authorizee_id: authorizee.id };

      if(obj.owner) {
        query.type = 'Owner';
      }
      return Permission
        .where(query)
        .fetch()
        .then(function(permission){
          if(permission) {
            return true;
          } else {
            return authorized;
          }
        });
    }, false)
    .then(function(authorized){
      if(authorized) {
        return Promise.resolve();
      } else {
        return Promise.reject({ status: 401, message: 'Unauthorized' });
      }
    })
  }
});

module.exports = bookshelf.model('Permission', Permission);
