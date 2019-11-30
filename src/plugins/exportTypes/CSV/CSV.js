var MODULE_ID = "export-type-CSV";
var LANG = L.exportTypePlugins.CSV;


var _loadSettings = function (settings) {
	$("#etCSV_delimiter").val(settings.delimiter);
	$("#etCSV_lineEndings").val(settings.eol);
};

var _saveSettings = function () {
	return {
		"delimiter": $("#etCSV_delimiter").val(),
		"eol": $("#etCSV_lineEndings").val()
	};
};

var _resetSettings = function () {
	$("#etCSV_delimiter").val("|");
	$("#etCSV_lineEndings").val("Windows");
};

var _validate = function () {
	var delimiterField = $("#etCSV_delimiter");
	var errors = [];

	// note we don't trim it. I figure whitespace could, technically be used as a delimiter
	if (delimiterField.val() === "") {
		errors.push({
			els: delimiterField,
			error: LANG.validation_no_delimiter
		});
	}

	return errors;
};
