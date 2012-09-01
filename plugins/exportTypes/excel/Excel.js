/**
 *
 */
define([
	"constants",
	"manager"
], function(C, manager) {

	var MODULE_ID = "export-type-Excel";

	var _init = function() {

	}

	var _run = function() {
		if ($("#xml_use_custom_format").attr("checked")) {
			_toggleCustomXMLFormat.call($("#xml_use_custom_format")[0]);
		}
		//$("input[name=sql_statement_type]").bind("click", Generator.changeStatementType);
		$("#xml_use_custom_format").bind("click", _toggleCustomXMLFormat);
	}

	var _toggleCustomXMLFormat = function() {
		if ($(this).attr("checked")) {
			$("#xml_custom_format").removeAttr("disabled").removeClass("disabled");
		} else {
			$("#xml_custom_format").attr("disabled", "disabled").addClass("disabled");
		}
	};

	manager.register(MODULE_ID, C.COMPONENT.EXPORT_TYPE, {
		init: _init,
		run: _run
	});
});