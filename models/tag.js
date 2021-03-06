'use strict';

var bookshelf = require('../db');
var checkit = require('checkit');

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
  }

});

module.exports = bookshelf.model('Tag', Tag);
