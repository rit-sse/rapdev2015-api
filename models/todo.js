'use strict';

var bookshelf = require('../db');
var checkit = require('checkit');

var Todo = bookshelf.Model.extend({
  tableName: 'todos',
  initialize: function() {
    this.on('saving', this.validate);
  },

  validate: function() {
    return checkit({
      name: 'required',
      completed: 'required',
      elapsedTime: 'required'
    }).run(this.attributes);
  },

  identity: function() {
    return this.belongsTo('Identity');
  },

  parent: function() {
    return this.belongsTo('Todo');
  },

  subtasks: function() {
    return this.hasMany('Todo');
  },

  settings: function() {
    return this.morphMany('Settings', 'settable');
  },

  tags: function() {
    return this.belongsToMany('Tag');
  }

});

module.exports = bookshelf.model('Todo', Todo);
