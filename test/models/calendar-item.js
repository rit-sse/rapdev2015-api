var model = require('../../models').model;

var CalendarItem, User, Event;

describe('CalendarItem', function(){
  beforeEach(function(){
    CalendarItem = model('calendarItem');
    User = model('user');
    Event = model('event');

    CalendarItem.create({ accepted: 'Accepted' }, function() {
      Event.create( { }, function() {

      });
    });
  });

  describe('validations', function(){

  });

});
