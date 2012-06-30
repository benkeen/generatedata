/**
 *
 */
define([
	"constants",
	"mediator"
], function(C, mediator) {

	var MODULE_ID = "export_type_excel";


	var _init = function() {

	}

	var _run = function() {

	}

	/*

		if ($("#xml_use_custom_format").attr("checked")) {
			Generator.toggleCustomXMLFormat.call($("#xml_use_custom_format")[0]);
		}
		$("input[name=sql_statement_type]").bind("click", Generator.changeStatementType);
		$("#xml_use_custom_format").bind("click", Generator.toggleCustomXMLFormat);


		toggleCustomXMLFormat: function() {
			if ($(this).attr("checked")) {
				$("#xml_custom_format").attr("disabled", false);
				$("#xml_custom_format").removeClass("disabled");
			} else {
				$("#xml_custom_format").attr("disabled", true);
				$("#xml_custom_format").addClass("disabled");
			}
		},

	 */

	mediator.register(MODULE_ID, C.COMPONENT.EXPORT_TYPE, {
		init: _init,
		run: _run
	});
});