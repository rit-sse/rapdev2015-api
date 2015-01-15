var db = require('../db');
var models = require('../models');

beforeEach(function(done){
  db.automigrate();
});
