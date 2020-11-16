var isArray = require('./isArray.js');
var _deepGet = require('./_deepGet.js');

// Generates a function for a given object that returns a given property.
function propertyOf(obj) {
  if (obj == null) {
    return function(){};
  }
  return function(path) {
    return !isArray(path) ? obj[path] : _deepGet(obj, path);
  };
}

module.exports = propertyOf;
