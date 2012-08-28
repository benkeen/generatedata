define([
	"constants",
	"lang",
	"mediator"
], function(C, L, mediator) {

	var MODULE_ID = "export-type-XML";
	var LANG = L.modules.XML;

	/**
	 * Called when the user changes the result type.
	 */
	var _resultTypeChanged = function(msg) {
		if (msg.newExportType == "XML") {
			$("#gdColTitleTop,#gdColTitleBottom").html(LANG.row_label);
		}
	}

	var _init = function() {
		var subscriptions = {};
		subscriptions[C.EVENT.RESULT_TYPE.CHANGE] = _resultTypeChanged;
		mediator.subscribe(MODULE_ID, subscriptions);
	}

	var _run = function() {

	}

	mediator.register(MODULE_ID, C.COMPONENT.EXPORT_TYPE, {
		init: _init,
		run: _run
	});
});