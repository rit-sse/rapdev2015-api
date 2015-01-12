'use strict';

var orm = require('orm');

module.exports = function(db, models) {
  var Tag = db.define('tags', {
    name: String,
    color: String
  }, {
    validations: {
      name: [
        orm.validators.required(),
        orm.validators.notEmptyString()
      ],
      color: [
        orm.validators.required(),
        orm.validators.notEmptyString(),
        orm.validators.patterns.hexString()
      ]
    }
  });

  Tag.associate = function(models) {
    Tag.hasOne('user', models.user, { reverse: 'tags' });
    Tag.hasMany('events', models.event, {}, { reverse: 'tags' });
    Tag.hasMany('todos', models.todo, {}, { reverse: 'tags' });
  }

  Tag.createTag = function(tName, tColor, userId, models, cb) {
    models.user.find({id:userId}, function(err, userResult) {
      if(userResult.length == 1) {
        var user = userResult[0];
        models.tag.create({name:tName, color:tColor}, function(err, tagResult) {
          if(!err) {
            tagResult.setUser(user, function(error) {
              if(!error) {
                cb({result:"SUCCESS"});
              } else {
                cb({result:"ERROR"});
              }
            });
          } else {
            cb({result:"ERROR"});
          }
        });
      } else {
        cb({result:"ERROR: No such user"});
      }
    });
  };
  models.tag = Tag;
}
