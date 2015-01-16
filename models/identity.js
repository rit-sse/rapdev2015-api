'use strict';

var bookshelf = require('../db');
var checkit = require('checkit');

var Identity = bookshelf.Model.extend({
  tableName: 'identities',
  initialize: function() {
    this.on('saving', this.validate);
  },

  validate: function() {
    return checkit({
      name: 'required',
      singular: 'required'
    }).run(this.attributes);
  },

  permissions: function() {
    return this.morphMany('Permission', 'subject');
  },

  eventAndTagPermissions: function() {
    return this.morphMany('Permission', 'subject');
  },

  tagPermissions: function() {
    return this.related('eventAndTagPermissions').where({subject_type:'tags'});
  },
  todos: function() {
    return this.hasMany('Todo');
  }

});

module.exports = bookshelf.model('Identity', Identity);
