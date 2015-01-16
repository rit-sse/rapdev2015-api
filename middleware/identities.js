var User = require('../models/user');

module.exports = function() {
  return function(req, res, next) {
    if(req.user) {

      User
        .where(req.user)
        .fetch({ withRelated: ['permissions']})
        .then(function(user){
          user.related('permissions').mapThen(function(permission){
            return permission.related('subject').fetch().then(function(subject){
              return subject;
            })
          }).then(function(identities){
            req.identities = identities;
            next();
          });
       })
    }
  }
}
