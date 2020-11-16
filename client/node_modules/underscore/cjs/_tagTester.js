var _setup = require('./_setup.js');

// Internal function for creating a `toString`-based type tester.
function tagTester(name) {
  return function(obj) {
    return _setup.toString.call(obj) === '[object ' + name + ']';
  };
}

module.exports = tagTester;
