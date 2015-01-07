var fs = require('fs');

module.exports = function(db, models) {
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
