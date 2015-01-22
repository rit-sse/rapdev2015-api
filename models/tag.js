'use strict';

var bookshelf = require('../db');
var checkit = require('checkit');
var Promise = require('bluebird');
var validators = require('./validators');

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
                return tag;
              });
          }
        });
    });
  }
});

module.exports = bookshelf.model('Tag', Tag);
