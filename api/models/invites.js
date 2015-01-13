'use strict';

var orm = require('orm');

module.exports = function(db, models) {
  var Invites = db.define('invites', {
    accepted: ['Accepted', 'Pending', 'Declined'],
    email: String
  }, {
    validations: {
      accepted: orm.validators.required(),
      email: [
        orm.validators.required(),
        orm.validators.unique(),
        orm.validators.notEmptyString(),
        orm.validators.patterns.email()
      ]
    }
  });

  Invites.associate = function(models) {
    Invites.hasOne('itemOwner', models.user, { reverse: 'itemsOwned' });
    Invites.hasOne('invitedBy', models.user, { reverse: 'itemsInvitedTo' });
    Invites.hasOne('event', models.event, { reverse: 'calendarItems' });
  }


  models.invites = Invites;
}

