var isArray = require('./isArray.js');
var keys = require('./keys.js');
var _isArrayLike = require('./_isArrayLike.js');
var isArguments = require('./isArguments.js');
var isString = require('./isString.js');

// Is a given array, string, or object empty?
// An "empty" object has no enumerable own-properties.
function isEmpty(obj) {
  if (obj == null) return true;
  // Skip the more expensive `toString`-based type checks if `obj` has no
  // `.length`.
  if (_isArrayLike(obj) && (isArray(obj) || isString(obj) || isArguments(obj))) return obj.length === 0;
  return keys(obj).length === 0;
}

module.exports = isEmpty;
