'use strict';

var fs = require('fs');
var schema = require('../db');

module.exports = function() {
  fs
    .readdirSync(__dirname)
    .filter(function(file) {
      return (file.indexOf('.') !== 0) && (file !== 'index.js');
    })
    .forEach(function(file) {
      require('./' + file);
    });

  Object.keys(schema.models).forEach(function(modelName) {
    if ('associate' in schema.models[modelName]) {
      schema.models[modelName].associate(schema.models);
    }
  });

}
