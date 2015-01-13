'use strict';

var orm = require('orm');

module.exports = function(db, models) {
  var Calendar = db.define('calendars', {
    name: String,
  }, {
    validations: {
      name: orm.validators.required()
    }
  });

  Calendar.associate = function(models) {
  }

  models.calendar = Calendar;
}
