'use strict';

var bookshelf = require('../db');
var checkit = require('checkit');
var Promise = require('bluebird');
var helpers = require('./helpers');

var Event = bookshelf.Model.extend({
  tableName: 'events',
  hasTimestamps: true,
  initialize: function() {
    this.on('saving', this.validate);
  },

  validate: function() {
    return checkit({
      name: 'required',
      startTime: 'required',
      endTime: 'required'
    }).run(this.attributes);
  },

  user: function() {
    return this.morphMany('Settings', 'settable');
  },

  permissions: function() {
    return this.morphMany('Permission', 'subject');
  },

  tags: function() {
    return this.belongsToMany('Tag');
  },

  owner: function() {
    return this.related('permissions').fetch()
      .then(function(permissions){
        return permissions.findWhere({ type: 'Owner' });
      });
  },

  render: function() {
    return Promise.props({
      tags: this
        .related('tags')
        .fetch()
        .then(function(tags) {
          return tags.mapThen(function(tag){
            return tag.render();
          });
        }),
      owner: this
        .owner()
        .then(function(owner){
          return owner.render();
        })
    })
      .then(function(result){
        return this.set({
          owner: result.owner,
          tags: result.tags,
          url: '/events/' + this.id
        })
      })
  }
}, {
  getForIdentities: function(identities) {
    return req.identities.mapThen(function(identity){
      return identity.eventPermissions().then(function(permissions){
        return permissions;
      });
    })
    .then(helpers.flatten)
    .then(function(eventPermissions){
      return Promise.map(eventPermissions, function(permission){
        return permission.related('subject').fetch().then(function(subject){
          return subject;
        })
      });
    })
    .then(helpers.flatten);
  }
});

module.exports = bookshelf.model('Event', Event);
