var _setup = require('./_setup.js');
var isArray = require('./isArray.js');
var _has = require('./_has.js');

// Shortcut function for checking if an object has a given property directly on
// itself (in other words, not on a prototype). Unlike the internal `has`
// function, this public version can also traverse nested properties.
function has(obj, path) {
  if (!isArray(path)) {
    return _has(obj, path);
  }
  var length = path.length;
  for (var i = 0; i < length; i++) {
    var key = path[i];
    if (obj == null || !_setup.hasOwnProperty.call(obj, key)) {
      return false;
    }
    obj = obj[key];
  }
  return !!length;
}

module.exports = has;
