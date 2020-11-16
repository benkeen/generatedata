var isArray = require('./isArray.js');
var _shallowProperty = require('./_shallowProperty.js');
var _deepGet = require('./_deepGet.js');

// Creates a function that, when passed an object, will traverse that object’s
// properties down the given `path`, specified as an array of keys or indices.
function property(path) {
  if (!isArray(path)) {
    return _shallowProperty(path);
  }
  return function(obj) {
    return _deepGet(obj, path);
  };
}

module.exports = property;
