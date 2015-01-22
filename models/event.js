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
      })
      .then(function(permission){
        return permission.related('authorizee').fetch();
      });
  },

  render: function() {
    var _this = this;
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
          return owner._render();
        })
    })
      .then(function(result){
        return _this.set({
          owner: result.owner,
          tags: result.tags,
          url: '/events/' + _this.id
        }).pick('id', 'startTime', 'endTime', 'name', 'description', 'tags', 'owner', 'url');
      })
  }
}, {
  getForIdentities: function(identities) {
    return identities.mapThen(function(identity){
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
  },

  createEvent: function(body) {
    var Tag = bookshelf.model('Tag');
    var Permission = bookshelf.model('Permission');

    return Event.forge({
      startTime: body.startTime,
      endTime: body.endTime,
      name: body.name,
      description: body.description,
    })
    .save()
    .then(function(event){
      return Tag
        .findOrCreateByNameArray( body.tags, body.identity_id )
        .then(function(tags){
          return event.tags().attach(tags);
        })
        .then(function(){
          return event;
        })
    })
    .then(function(event){
      return Permission
        .forge({pending: false,
                type: 'Owner',
                authorizee_id: body.identity_id,
                authorizee_type: 'identities',
                subject_id: event.id,
                subject_type: 'events'
              })
        .save()
        .then(function(){
          return event;
        })
    });

  }
});

module.exports = bookshelf.model('Event', Event);
