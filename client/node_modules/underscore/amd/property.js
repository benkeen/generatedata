define(['./isArray', './_shallowProperty', './_deepGet'], function (isArray, _shallowProperty, _deepGet) {

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

  return property;

});
