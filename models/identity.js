'use strict';

var bookshelf = require('../db');
var checkit = require('checkit');
var Promise = require('bluebird');

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

  tagPermissions: function() {
    return this.related('eventAndTagPermissions').where({subject_type:'tags'});
  },
  todos: function() {
    return this.hasMany('Todo');
  },
  returnIdentity: function(identityId, cb){
      return this
      .set("url", "/identities/" + identityId)
      //.then(cb);
  }




},{
  createIdentity: function(name,singular,user,cb){
    return Identity
    .forge({name:name, singular:singular})
    .save()
    .then(function(identity){
      var Permission = bookshelf.model('Permission');
      return Permission
        .forge({pending: false, type: 'Owner', authorizee_id: user.id, authorizee_type: 'users',
              subject_id: identity.id, subject_type: 'identities'})
        .save()
        .then(function(permission){
          return Promise.resolve(identity);
        })
    });
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
  }

});


module.exports = bookshelf.model('Identity', Identity);
