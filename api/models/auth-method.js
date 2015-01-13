
'use strict';

var db = require('../db');

var AuthMethod = db.define('auth_methods', {
  authId: String,
  type: String
}, {
    validations: {
      authId: [
        orm.validators.required(),
        orm.validators.unique(),
        orm.validators.notEmptyString()
      ],
      type: [
        orm.validators.required(),
        orm.validators.notEmptyString()
      ]
    }
  });

  AuthMethod.associate = function(models) {
    AuthMethod.hasOne('user', models.user, { reverse: 'authMethods' });
  }

  models.authMethod = AuthMethod;
}
