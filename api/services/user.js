'use strict';

module.exports = { 
  createUser: function(resp, req, cb) {
    var facebookId = {};
    facebookId.userId = resp.data.user_id;
    req.models.facebook.find({userId:facebookId.userId}, function (err, users) {
      if(users.length == 0) {
        req.models.facebook.create(facebookId, function(err,results) {
          var fbidResults = results;
                
          req.models.user.create({}, function(err, results) {
            var userResult = results;
            userResult.addFacebook([fbidResults], function(err){
               cb(userResult.id);
            });
          });
        });
      } else {
        cb(users[0]);
      }
    });
  }
}
