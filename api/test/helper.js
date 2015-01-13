var orm = require('orm');
var models = require('../models');

beforeEach(function(done){
  orm.connect('sqlite://db/test.sqlite', function(err, db) {
    models.load(db, {});
    db.drop(db.sync(done));
  });
});
