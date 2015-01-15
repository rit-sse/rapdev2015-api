'use strict';

var bookshelf = require('../db');
var checkit = require('checkit');

var Settings = require('./settings');
var Permission = require('./permission');

var User = bookshelf.Model.extend({
  tableName: 'users',
  initialize: function() {
    this.on('saving', this.validate);
  },

  validate: function() {
    return checkit({
      preferredEmail: 'required'
    }).run(this.attributes);
  },

  permissions: function() {
    return this.morphMany(Permission, 'authorizee');
  },

  settings: function() {
    return this.belongsToMany(Settings);
  }
});

// User.createUser = function( config, type, next, cb ) {
//   var am = {
//     authId: config.id,
//     type: type
//   };
//   var email = config.email;
//   db.models.AuthMethod.findOne( { where: am } , function (err, authMethod) {
//     if(err) return next(err);
//     if(!authMethod) {
//       if(err) return next(err);
//       var user = new User({ preferredEmail: email });
//       user.save(function(err) {
//         if(err) return next(err);
//         user.authMethods.create(am, function(err){
//           cb(user);
//         });
//       });
//     } else {
//       console.log(authMethod.user());
//       cb(authMethod.user());
//     }
//   });
// }


// User.prototype.getEvents = function() {
//   this.identityPermissions().forEach(function(identityPermission){
//     return identityPermission.idenities().reduce(function(a, identity ){
//       a.concat(identity.events());
//     });
//   });
// }

// User.prototype.addEvent = function(event, next) {
//   var event = new Event(event);
//   this.events.create(event, function(err) {
//     if(err) return next(err);
//   });
// }

module.exports = User;
