'use strict';

var fs = require('fs');

module.exports = function(bookshelf) {
  fs
    .readdirSync(__dirname)
    .filter(function(file) {
      return (file.indexOf('.') !== 0) && (file !== 'index.js');
    })
    .forEach(function(file) {
      require('./' + file)(bookshelf);
    });
}
