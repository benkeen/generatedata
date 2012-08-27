define([
	"constants",
	"mediator"
], function(C, mediator) {

	var MODULE_ID = "export-type-SQL";

	var _changed = function(msg) {
		console.log("!!!", msg);

	}
	var _init = function() {
		var subscriptions = {};
		subscriptions[C.EVENT.RESULT_TYPE.CHANGE] = _changed;
		mediator.subscribe(MODULE_ID, subscriptions);
	}

	var _run = function() {
	}

	mediator.register(MODULE_ID, C.COMPONENT.EXPORT_TYPE, {
		init: _init,
		run: _run
	});
});