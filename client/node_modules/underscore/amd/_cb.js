define(['./_baseIteratee', './underscore', './iteratee'], function (_baseIteratee, underscore, iteratee) {

  // The function we call internally to generate a callback. It invokes
  // `_.iteratee` if overridden, otherwise `baseIteratee`.
  function cb(value, context, argCount) {
    if (underscore.iteratee !== iteratee) return underscore.iteratee(value, context);
    return _baseIteratee(value, context, argCount);
  }

  return cb;

});
