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

  models.tag = Tag;
}
