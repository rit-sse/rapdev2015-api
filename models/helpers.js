var Promise = require('bluebird');

module.exports = {
  flatten: function(object) {
    return Promise.reduce(object, function(a, b){
      return a.concat(b);
    }, []);
  }
}
