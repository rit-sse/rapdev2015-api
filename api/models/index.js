var fs = require('fs');
var definedModels;
module.exports.load = function(db, models) {
  definedModels = models;
  fs
    .readdirSync(__dirname)
    .filter(function(file) {
      return (file.indexOf('.') !== 0) && (file !== 'index.js');
    })
    .forEach(function(file) {
      require('./' + file)(db, models);
    });

  Object.keys(models).forEach(function(modelName) {
    if ('associate' in models[modelName]) {
      models[modelName].associate(models);
    }
  });

}

module.exports.models = definedModels;
