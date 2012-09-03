define([
	"constants",
	"lang",
	"manager"
], function(C, L, manager) {

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

	/*changeStatementType: function() {
			if ($("input[name=sql_statement_type]:checked").val() == "update") {
				$("#spk1").attr("checked", "checked");
				$("input[name=sql_primary_key]").attr("disabled", "disabled");
			} else {
				$("input[name=sql_primary_key]").attr("disabled", "");
			}
		},
*/

	var _init = function() {
		var subscriptions = {};
		subscriptions[C.EVENT.RESULT_TYPE.CHANGE] = _resultTypeChanged;
		manager.subscribe(MODULE_ID, subscriptions);
	}
	var _run = function() {

	}

	manager.register(MODULE_ID, C.COMPONENT.EXPORT_TYPE, {
		init: _init,
		run: _run
	});
});