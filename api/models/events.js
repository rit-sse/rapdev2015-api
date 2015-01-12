'use strict';

var orm = require("orm");

function startTimeBeforeEndTime(v, next) {
  var start = new Date(v);
  var end = new Date(this.endTime);
  if(start < end) {
    return next();
  }
  return next('start-time-after-end-time');
}

module.exports = function(db, models) {
  var Event = db.define('events', {
    name: String,
    description: String,
    startTime: Date,
    endTime: Date
  }, {
    validations: {
      name: [
        orm.validators.required(),
        orm.validators.notEmptyString()
      ],
      startTime:[
        startTimeBeforeEndTime
      ]
    }
  });

  Event.associate = function(models) {
    Event.hasOne('user', models.user, { reverse: 'events' });
  }

  Event.findAllByUserId = function(userId, cb){
    Event.find({user: userId}, cb);
  }

  Event.findById = function(eventId, cb) {
    Event.find({id: eventId}, cb);
  }

  Event.createEvent = function(name, description, startTime, endTime, userId, models, cb) {
    models.user.find({id: userId}, function(err,user){
      if (err){
        cb(err,user);
      } else {
        models.event.create({name:name, description: description, startTime: startTime, endTime: endTime}, function(err,newEvent){
          if (err){
            cb(err,newEvent);
          } else {
            var foundUser = user[0];
            newEvent.setUser(foundUser, cb);
          }
        });
      }
    });
  }

  models.event = Event;
}
