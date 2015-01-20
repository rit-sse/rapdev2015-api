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
    return this.morphMany('Permission', 'authorizee');
  },

  eventPermissions: function() {
    return this.related('eventAndTagPermissions').fetch()
      .then(function(events){
        return events.where({subject_type: 'events' });
      })
  },

  tagPermissions: function() {
    return this.related('eventAndTagPermissions').fetch()
      .then(function(tags) {
        return tags.where({subject_type: 'tags'});
      })
  },

  todos: function() {
    return this.hasMany('Todo');
  },

  members: function() {
    return this
      .related('permissions')
      .fetch()
      .then(function(permissions){
        return permissions.mapThen(function(permission){
          return permission
            .related('authorizee')
            .fetch()
            .then(function(user){
              return user;
            });
        })
      });
  },

  _render: function(){
    return {
      id: this.id,
      url: "/identities/" + this.id,
      name: this.attributes.name,
      singular: this.attributes.singular
    }
  },

  render: function() {
    var _this = this;
    return this
      .members()
      .then(function(members){
        return Promise.map(members, function(member){
          return member.render();
        })
      })
      .then(function(members){
        var obj = _this._render()
        obj.members = members;
        return obj
      });
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
