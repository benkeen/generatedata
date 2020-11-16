define(['./underscore', './delay', './partial'], function (underscore, delay, partial) {

	// Defers a function, scheduling it to run after the current call stack has
	// cleared.
	var defer = partial(delay, underscore, 1);

	return defer;

});
