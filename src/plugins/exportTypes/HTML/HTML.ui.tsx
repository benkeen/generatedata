import * as React from 'react';

/*
<div id="etHTMLCustomFormatDialog" style="display:none">
	<div style="width: 300px; float: left;">
		<h4>{i18n.available_smarty_vars}</h4>

		<pre>{\$isFirstBatch}, {\$isLastBatch}</pre>
		{i18n.batch_vars}

		<pre>{\$colData}</pre>
		{i18n.col_names_array}

		<pre>{\$rowData}</pre>
		{i18n.row_data_array}

		<button className="gdPrimaryButton" id="etHTML_ResetCustomHTML">{i18n.reset_custom_html}</button>
	</div>
	<div id="etHTMLCustomContent">
		<textarea name="etHTMLCustomSmarty" id="etHTMLCustomSmarty"></textarea>
			<script type="text/template" id="etHTMLCustomSmarty_Template">{if \$isFirstBatch}
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<style type="text/css">
	body { margin: 10px; }
	table, th, td, li, dl { font-family: "lucida grande", arial; font-size: 8pt; }
	dt { font-weight: bold; }
	table { background-color: #efefef; border: 2px solid #dddddd; width: 100%; }
	th { background-color: #efefef; }
	td { background-color: #ffffff; }
	</style>
</head>
<body>

<table cellspacing="0" cellpadding="1">
<tr>
{foreach \$colData as \$col}
	<th>{\$col}</th>
{/foreach}
</tr>
{/if}
{foreach \$rowData as \$row}
<tr>
{foreach \$row as \$r}	<td>{\$r}</td>
{/foreach}
</tr>
{/foreach}

{if \$isLastBatch}
</table>

</body>
</html>
{/if}</script>

	</div>
</div>
*/

export type ExportFormatState = {
	exportFormat: 'table' | 'ul' | 'dl'
};

export const state = {
	exportFormat: 'table'
};

export const Settings = ({ i18n, data }: any): JSX.Element => {

	return (
		<>
			<table cellSpacing="0" cellPadding="0">
			<tr>
				<td>{i18n.data_format}</td>
				<td>
					<input type="radio" id="etHTMLExportFormat1" value="table" checked={data.exportFormat === 'table'} />
						<label htmlFor="etHTMLExportFormat1">&lt;table&gt;</label>
					<input type="radio" id="etHTMLExportFormat2" value="ul" checked={data.exportFormat === 'ul'} />
						<label htmlFor="etHTMLExportFormat2">&lt;ul&gt;</label>
					<input type="radio" id="etHTMLExportFormat3" value="dl" checked={data.exportFormat === 'dl'} />
						<label htmlFor="etHTMLExportFormat3">&lt;dl&gt;</label>
				</td>
				<td>
					<input type="checkbox" id="etHTMLUseCustomExportFormat" />
						<label htmlFor="etHTMLUseCustomExportFormat">{i18n.use_custom_html_format}</label>
					<input type="button" id="etHTMLEditCustomFormat" value="edit" disabled />
				</td>
			</tr>
			</table>
		</>
	);

	// 			<input type="hidden" name="etHTMLCustomHTMLSource" id="etHTMLCustomHTMLSource" />
};


// var _init = function() {
// 	$("#etHTMLEditCustomFormat").bind("click", function() { _openEditCustomFormatDialog(); return false; });
// 	$("#etHTMLUseCustomExportFormat").bind("click", function() {
// 		if (this.checked) {
// 			$("#etHTMLEditCustomFormat").removeAttr("disabled");
// 			$(".etHTMLDefaultFormats").attr("disabled", "disabled");
// 			$(".etHTMLDefaultFormatLabels").addClass("gdDisabledText");
// 		} else {
// 			$("#etHTMLEditCustomFormat").attr("disabled", "disabled");
// 			$(".etHTMLDefaultFormats").removeAttr("disabled");
// 			$(".etHTMLDefaultFormatLabels").removeClass("gdDisabledText");
// 		}
// 	});

// 	var subscriptions = {};
// 	subscriptions[C.EVENT.GENERATE] = _onGenerate;
// 	manager.subscribe(MODULE_ID, subscriptions);

// 	$("#etHTMLCustomContent .CodeMirror").addClass("CodeMirror_medium");
// 	_codeMirror = CodeMirror.fromTextArea($("#etHTMLCustomSmarty")[0], {
// 		mode: "smartymixed",
// 		lineNumbers: true
// 	});
// 	_codeMirror.setValue($("#etHTMLCustomSmarty_Template").html());
// 	$("#etHTML_ResetCustomHTML").on("click", _resetCustomHTML);
// };

// var _updateDialogDimensions = function() {
// 	var dimensions = _getDialogDimensions();

// 	if ($("#etHTMLCustomFormatDialog").hasClass("ui-dialog-content")) {
// 		$("#etHTMLCustomFormatDialog").dialog("option", "width", dimensions.dialogWidth);
// 		$("#etHTMLCustomFormatDialog").dialog("option", "height", dimensions.dialogHeight);
// 	}
// };

// var _openEditCustomFormatDialog = function() {
// 	var dimensions = _getDialogDimensions();

// 	// calculate size of main content area
// 	$("#etHTMLCustomFormatDialog").dialog({
// 		title: LANG.custom_html_format,
// 		modal: true,
// 		width: dimensions.dialogWidth,
// 		height: dimensions.dialogHeight,
// 		resizable: false,
// 		open: function() {
// 			$("#etHTMLCustomContent .CodeMirror, #etHTMLCustomContent .CodeMirror-scroll").css({
// 				width: dimensions.contentWidth,
// 				height: dimensions.contentHeight
// 			});
// 			_codeMirror.refresh();
// 		},
// 		buttons: [
// 			{
// 				text: L.close,
// 				click: function() {
// 					$(this).dialog("close");
// 				}
// 			}
// 		]
// 	});
// 	return false;
// };

// var _getDialogDimensions = function() {
// 	var dialogHeight  = ($(window).height() / 100) * 90;
// 	var dialogWidth   = ($(window).width() / 100) * 90;
// 	var contentHeight = dialogHeight - 110;
// 	var contentWidth  = dialogWidth - 370;

// 	return {
// 		dialogHeight: dialogHeight,
// 		dialogWidth: dialogWidth,
// 		contentHeight: contentHeight,
// 		contentWidth: contentWidth
// 	};
// };

/**
 * If the user is generating in-page data with this Export Type, enable the XML
 * mode for the in-page editor.
 */
// var _onGenerate = function(msg) {
// 	$("#etHTMLCustomHTMLSource").val(_codeMirror.getValue());
// 	if (msg.exportTarget != "inPage" || msg.exportType != "HTML") {
// 		return;
// 	}
// 	msg.editor.setOption("mode", "xml");
// };

// var _loadSettings = function(settings) {
// 	$("input[name=etHTMLExportFormat][value=" + settings.dataFormat + "]").attr("checked", "checked");
// 	if (settings.useCustomExportFormat == "1") {
// 		$("#etHTMLUseCustomExportFormat").attr("checked", "checked");
// 	} else {
// 		$("#etHTMLUseCustomExportFormat").removeAttr("checked");
// 	}
// 	$("#etHTMLCustomSmarty").val(settings.customExportSmartyContent);
// };

// var _saveSettings = function() {
// 	return {
// 		dataFormat: $("input[name=etHTMLExportFormat]:checked").val(),
// 		useCustomExportFormat: $("#etHTMLUseCustomExportFormat")[0].checked ? 1 : 0,
// 		customExportSmartyContent: _codeMirror.getValue()
// 	};
// };

// var _resetSettings = function() {
// 	$("input[name=etHTMLExportFormat][value=table]").attr("checked", "checked");
// 	$("#etHTMLUseCustomExportFormat").removeAttr("disabled").trigger("click");
// 	_codeMirror.setValue($("#etHTMLCustomSmarty_Template").html());
// };

// var _resetCustomHTML = function() {
// 	_codeMirror.setValue($("#etHTMLCustomSmarty_Template").html());
// };
