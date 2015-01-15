'use strict';

var bookshelf = require('../db');
var checkit = require('checkit');

var Todo = require('./todo');
var Event = require('./event');
var Permission = require('./permission');

var Tag = bookshelf.Model.extend({
  tableName: 'tags',
  initialize: function() {
    this.on('saving', this.validate);
  },

  validate: function() {
    return checkit({
      name: 'required',
      color: 'required',
      visibility: ['required'] //private public
    }).run(this.attributes);
  },

  permissions: function() {
    return this.morphMany(Permission, 'subject');
  },

  todos: function() {
    return this.belongsToMany(Todo);
  },

  events: function() {
    return this.belongsToMany(Event);
  }

});

module.exports = Tag;
