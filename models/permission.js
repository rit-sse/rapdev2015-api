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
    var query = { subject_id: subject.id,
                      subject_type: subject.tableName,
                      authorizee_type: authorizee.tableName,
                      authorizee_id: authorizee.id };

    if(obj.owner) {
      wherObj.type = 'Owner';
    }

    return this.where(query)
              .then(function(permission){
                if(permission.id) {
                  return Promise.resolve();
                } else {
                  return Promise.reject({ message: 'Unauthorized', status: '401' });
                }
              });
  }
});

module.exports = bookshelf.model('Permission', Permission);
