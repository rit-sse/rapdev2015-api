'use strict';

var bookshelf = require('../db');
var checkit = require('checkit');
var Promise = require('bluebird');
var validators = require('./validators');
var helpers = require('./helpers');

var Tag = bookshelf.Model.extend({
  tableName: 'tags',
  hasTimestamps: true,
  initialize: function() {
    this.on('saving', this.validate);
  },

  validate: function() {
    return checkit({
      name: 'required',
      color: 'required',
      visibility: ['required', validators.includes(['Private', 'Public'])]
    }).run(this.attributes);
  },

  permissions: function() {
    return this.morphMany('Permission', 'subject');
  },

  todos: function() {
    return this.belongsToMany('Todo');
  },

  events: function() {
    return this.belongsToMany('Event');
  },

  render: function() {
    return this.set({ url: '/tags/' + this.id }).pick('id', 'color', 'name', 'visibility', 'url');
  }

}, {
  findOrCreateByNameArray: function(tags, identity_id) {
    var Permission = bookshelf.model('Permission');
    return Promise.map(tags, function(tag){
      return Tag
        .where({ name: tag, identity_id: identity_id })
        .fetch()
        .then(function(foundTag){
          if(foundTag) {
            return foundTag;
          } else {
            return Tag
              .forge({ name: tag, color: '#ffffff', identity_id: identity_id, visibility: 'Private' })
              .save()
              .then(function(tag){
                return Permission
                  .forge({pending: false,
                    type: 'Owner',
                    authorizee_id: identity_id,
                    authorizee_type: 'identities',
                    subject_id: tag.id,
                    subject_type: 'tags'
                 })
                .save()
                .then(function(){
                  return tag;
                });
              })
              .then(function(tag){
                return tag;
              });
          }
        });
    });
  },

  getForIdentities: function(identities) {
    return identities.mapThen(function(identity){
      return identity.tagPermissions().then(function(permissions){
        return permissions;
      });
    })
    .then(helpers.flatten)
    .then(function(tagPermissions){
      return Promise.map(tagPermissions, function(permission){
        return permission.related('subject').fetch().then(function(subject){
          return subject;
        })
      });
    })
    .then(helpers.flatten);
  }
});

module.exports = bookshelf.model('Tag', Tag);
