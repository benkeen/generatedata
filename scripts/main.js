require([
	"generator",
	"utils",
	"libs/jquery-1.7.2.min",
	"libs/jquery-ui-1.8.19.custom.min",
	"libs/jquery.json-2.2.min",
	"scripts/lang.php?",
], function(generator, utils) {

	$(function() {
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
		generator.init();
	});

});
