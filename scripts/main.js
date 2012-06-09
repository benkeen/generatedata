require([
	"generator",
	"utils",
	"constants",
	"mediator",
	"libs/jquery-1.7.2.min",
	"libs/jquery-ui-1.8.19.custom.min",
	"libs/jquery.json-2.2.min",
	"scripts/lang.php?",
	"pageinit"
], function(generator, utils, C, mediator) {

	var module = {
		id: "mainpage",
		type: C.COMPONENT.CORE,
		loadSpeed: 10
	};

	mediator.register(module, function() {

		// TODO. Should use pub sub, too...
		$(".gdResultType").bind("click", function() { generator.changeResultType(this.value); });
		$(".gdCountries").bind("click", generator.updateCountryChoice);
		$(".deleteRowsBtn").bind("click", generator.deleteRows);
		$("input[name=sql_statement_type]").bind("click", generator.changeStatementType);
		$("#xml_use_custom_format").bind("click", generator.toggleCustomXMLFormat);
		if ($("#xml_use_custom_format").attr("checked")) {
			generator.toggleCustomXMLFormat.call($("#xml_use_custom_format")[0]);
		}

		$(".gdDeleteRows").live("change", generator.markRowAsDeleted);
		$(".gdAddRowsBtn").bind("click", function() { generator.addRows($("#gdNumRows").val()); })
		$("#gdTableRows").sortable({
			handle: ".gdColOrder",
			axis: "y",
			update: function(event, ui) {
				generator.restyleRows();
			}
		});
		$("#gdData").bind("submit", generator.submitForm);
//		generator.init();

		// determine which events we're going to subscribe to. This is used to map out the
		// Core behaviour to handle all built-in event handling
		var subscriptions = [
            {
            	type: C.RESULT_TYPE.CHANGE,
            	func: generator.handleEvent
            },

		];

		mediator.subscribe(subscriptions);
	});

});
