// this is the main generator web worker file for the Core script. It's used for generating a single batch of data.
// right now it's es5. SUUUUURE be nice to at least use es6 if not TS

onmessage = function (e) {
	var dataTypes = e.data.dataTypes;

	// load the Data Type generator web worker files
	dataTypes.forEach((dataType) => {
		importScripts("utils1.js");
	});
};
