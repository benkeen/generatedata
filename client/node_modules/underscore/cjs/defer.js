var underscore = require('./underscore.js');
var delay = require('./delay.js');
var partial = require('./partial.js');

// Defers a function, scheduling it to run after the current call stack has
// cleared.
var defer = partial(delay, underscore, 1);

module.exports = defer;
