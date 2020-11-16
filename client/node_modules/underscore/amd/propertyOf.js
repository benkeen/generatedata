define(['./isArray', './_deepGet'], function (isArray, _deepGet) {

  // Generates a function for a given object that returns a given property.
  function propertyOf(obj) {
    if (obj == null) {
      return function(){};
    }
    return function(path) {
      return !isArray(path) ? obj[path] : _deepGet(obj, path);
    };
  }

  return propertyOf;

});
