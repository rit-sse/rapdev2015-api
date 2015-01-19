module.exports = {
  includes: function(list) {
    return function(val) {
      if(list.indexOf(val) === -1) throw new Error('Value must be in the list' + list);
    }
  }
};
