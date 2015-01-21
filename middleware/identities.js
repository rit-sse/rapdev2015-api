var User = require('../models/user');
var Identity = require('../models/identity');

module.exports = function() {
  return function(req, res, next) {
    if(req.user) {
      User
        .where({id: req.user.id})
        .fetch()
        .then(function(user){
          user.related('permissions').fetch()
          .then(function(permissions) {
            return permissions.mapThen(function(permission){
              return permission.related('subject').fetch().then(function(subject){
                return subject;
              });
            });
          }).then(function(identities){
            req.identities = Identity.collection(identities);
            next();
          });
       })
    } else {
      next();
    }
  }
}
