'use strict';

var bookshelf = require('../db');
var checkit = require('checkit');

var Identity = bookshelf.Model.extend({
  tableName: 'identities',
  hasTimestamps: true,
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

  todos: function() {
    return this.hasMany('Todo');
  }

},{
  createIdentity: function(name,singular,user,cb){
    Identity
    .forge({name:name, singular:singular, members:[user]})
    .save()
    .then(cb);
  },
  updateIdentity: function(identityId, name, singular, memberIds, cb){
    var members = new Collection(memberIds)
      .mapThen(function(memberId){
        User
          .where({id: memberId})
          .fetch()
          .then(function(member){
            return member;
          })
      });
    Identity
        .where({id: identityId})
        .fetch()
        .set({
          name: name,
          singular: singular,
          members: members
        });
  },
  returnIdentity: function(identityId, cb){
    Identity
      .where({id: identityId})
      .fetch()
      .set("url", "/identities/" + identityId)
      .then(cb);
  }
});


module.exports = bookshelf.model('Identity', Identity);
