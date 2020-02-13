import * as React from 'react';


export type XMLSettings = {
	rootNodeName: string;
	recordNodeName: string;
	useCustomExportFormat: boolean;
	customFormat: string;
};

export const state: XMLSettings = {
	rootNodeName: 'records',
	recordNodeName: 'record',
	useCustomExportFormat: false,
	customFormat: ''
};

export const Settings = ({ data, i18n }: any): JSX.Element => {

	return (
		<>
			<table cellSpacing="0" cellPadding="0">
				<tr>
					<td valign="top">
						<table cellSpacing="0" cellPadding="0">
							<tr>
								<td className="etXMLDefaultFormatLabels"><label htmlFor="etXMLRootNodeName">{i18n.root_node_name}</label></td>
								<td>
									<input type="text" name="etXMLRootNodeName" id="etXMLRootNodeName" value={data.rootNodeName} />
								</td>
							</tr>
							<tr>
								<td className="etXMLDefaultFormatLabels"><label htmlFor="etXMLRecordNodeName">{i18n.record_node_name}</label></td>
								<td>
									<input type="text" name="etXMLRecordNodeName" id="etXMLRecordNodeName" value={data.recordNodeName} />
								</td>
							</tr>
						</table>
					</td>
					<td valign="top">
						<input type="checkbox" name="etXMLUseCustomExportFormat" id="etXMLUseCustomExportFormat" />
						<label htmlFor="etXMLUseCustomExportFormat">{i18n.use_custom_xml_format}</label>
						<input type="button" id="etXMLEditCustomFormat" value="edit" disabled={true} />
					</td>
				</tr>
			</table>

			<input type="hidden" name="etXMLCustomHTMLSource" id="etXMLCustomHTMLSource" />

			<div id="etXMLCustomFormatDialog" style={{ display: 'none' }}>
				<div style={{ width: 300, float: 'left' }}>
					<h4>{i18n.available_smarty_vars}</h4>

					<pre>$isFirstBatch, $isLastBatch</pre>
					{i18n.batch_vars}

					<pre>$colData</pre>
					{i18n.col_names_array}

					<pre>$rowData</pre>
					{i18n.row_data_array}

					<button className="gdPrimaryButton" id="etXML_ResetCustomHTML">{i18n.reset_custom_html}</button>
				</div>
				<div id="etXMLCustomContent">
					<textarea name="etXMLCustomSmarty" id="etXMLCustomSmarty"></textarea>
				</div>
			</div>
		</>
	);
}


// sucks to include this in the JS, but the <? .. ?> of the XML tag gets screwed up when embedding
// this in a hidden HTML element
var _defaultCustomXML = "{if $isFirstBatch}\n<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n" +
	"<records>\n" +
	"{/if}\n" +
	"{foreach $rowData as $row}\n" +
	"\t<record>\n" +
	"{foreach from=$colData item=col name=c}\n" +
	"\t\t<{$col}>{$row[$smarty.foreach.c.index]}</{$col}>\n" +
	"{/foreach}\n" +
	"\t</record>\n" +
	"{/foreach}\n" +
	"{if $isLastBatch}\n" +
	"</records>\n" +
	"{/if}";


	// var _init = function() {
	// 	var subscriptions = {};
	// 	subscriptions[C.EVENT.RESULT_TYPE.CHANGE] = _resultTypeChanged;
	// 	subscriptions[C.EVENT.GENERATE] = _onGenerate;
	// 	manager.subscribe(MODULE_ID, subscriptions);

	// 	$(window).resize(_updateDialogDimensions);
	// 	$("#etXMLEditCustomFormat").bind("click", function() { _openEditCustomFormatDialog(); return false; });

	// 	// assign event handlers for the custom sections option
	// 	$("#etXMLUseCustomExportFormat").bind("click", function() {
	// 		if (this.checked) {
	// 			$("#etXMLEditCustomFormat").removeAttr("disabled");
	// 			$("#etXMLRootNodeName,#etXMLRecordNodeName").attr("disabled", "disabled");
	// 			$(".etXMLDefaultFormatLabels").addClass("gdDisabledText");
	// 		} else {
	// 			$("#etXMLEditCustomFormat").attr("disabled", "disabled");
	// 			$("#etXMLRootNodeName,#etXMLRecordNodeName").removeAttr("disabled");
	// 			$(".etXMLDefaultFormatLabels").removeClass("gdDisabledText");
	// 		}
	// 	});

	// 	// for onload
	// 	if ($("#etXML_useCustomExportFormat").attr("checked")) {
	// 		$("#etXML_customFormat").removeAttr("disabled").removeClass("gdDisabled");
	// 	}

	// 	// initialize the CodeMirror field
	// 	_codeMirror = CodeMirror.fromTextArea($("#etXMLCustomSmarty")[0], {
	// 		mode: "smartymixed",
	// 		lineNumbers: true
	// 	});
	// 	$("#etXMLCustomContent .CodeMirror").addClass("CodeMirror_medium");

	// 	// initialize CodeMirror to contain the default content
	// 	_codeMirror.setValue(_defaultCustomXML);

	// 	$("#etXML_ResetCustomHTML").on("click", _resetCustomHTML);
	// };


	// var _validate = function(rowNums) {
	// 	var errors = [];
	// 	var invalidNodeNames  = [];
	// 	for (var i=0; i<rowNums.length; i++) {
	// 		var rowNum = rowNums[i];
	// 		var nodeName = $("#gdTitle_" + rowNum);
	// 		var nodeNameVal = nodeName.val();

	// 		if (nodeNameVal.match(/\W/) || nodeNameVal.match(/^[^a-zA-Z]/)) {
	// 			invalidNodeNames.push({
	// 				field: $("#gdTitle_" + rowNum),
	// 				visibleRowNum: generator.getVisibleRowOrderByRowNum(rowNum)
	// 			});
	// 		}
	// 	}

	// 	if (invalidNodeNames.length) {
	// 		var problemFields = [];
	// 		var rowNumbers    = [];
	// 		for (var j=0; j<invalidNodeNames.length; j++) {
	// 			problemFields.push(invalidNodeNames[j].field);
	// 			rowNumbers.push(invalidNodeNames[j].visibleRowNum);
	// 		}
	// 		errors.push({ els: problemFields, error: LANG.invalid_node_names + " <b>" + rowNumbers.join(", ") + "</b>" });
	// 	}

	// 	var rootNode        = $("#etXMLRootNodeName");
	// 	var rootNodeValue   = $.trim(rootNode.val());
	// 	var recordNode      = $("#etXMLRecordNodeName");
	// 	var recordNodeValue = $.trim(recordNode.val());

	// 	if (rootNodeValue === "") {
	// 		errors.push({ els: [rootNode], error: LANG.missing_xml_root_node_name });
	// 	} else if (rootNodeValue.match(/\W/)) {
	// 		errors.push({ els: [rootNode], error: LANG.invalid_xml_root_node_name });
	// 	} else if (recordNodeValue === "") {
	// 		errors.push({ els: [recordNode], error: LANG.missing_xml_record_node_name });
	// 	} else if (recordNodeValue.match(/\W/)) {
	// 		errors.push({ els: [recordNode], error: LANG.invalid_xml_record_node_name });
	// 	}

	// 	return errors;
	// };


/**
 * Called when the user changes the result type. This just changes the 2nd column heading to be
 * "Node Name" rather than the default "Column Title".
 */
	// var _resultTypeChanged = function(msg) {
	// 	if (msg.newExportType === "XML") {
	// 		$("#gdColTitleTop,#gdColTitleBottom").html(LANG.row_label);
	// 	}
	// };

	// var _openEditCustomFormatDialog = function() {
	// 	var dimensions = _getDialogDimensions();

	// 	// calculate size of main content area
	// 	$("#etXMLCustomFormatDialog").dialog({
	// 		title: "Custom XML Format",
	// 		modal: true,
	// 		width: dimensions.dialogWidth,
	// 		height: dimensions.dialogHeight,
	// 		open: function() {
	// 			$("#etXMLCustomContent .CodeMirror, #etXMLCustomContent .CodeMirror-scroll").css({
	// 				width: dimensions.contentWidth,
	// 				height: dimensions.contentHeight
	// 			});
	// 			_codeMirror.refresh();
	// 		},
	// 		buttons: [
	// 			{
	// 				text: "Close",
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

	// var _updateDialogDimensions = function() {
	// 	var dimensions = _getDialogDimensions();
	// 	if ($("#etXMLCustomFormatDialog").hasClass("ui-dialog-content")) {
	// 		$("#etXMLCustomFormatDialog").dialog("option", "width", dimensions.dialogWidth);
	// 		$("#etXMLCustomFormatDialog").dialog("option", "height", dimensions.dialogHeight);
	// 	}
	// };

	// /**
	//  * If the user is generating in-page data with this Export Type, enable the XML
	//  * mode for the in-page editor.
	//  */
	// var _onGenerate = function(msg) {
	// 	$("#etXMLCustomHTMLSource").val(_codeMirror.getValue());
	// 	if (msg.exportTarget != "inPage" || msg.exportType != "XML") {
	// 		return;
	// 	}
	// 	msg.editor.setOption("mode", "xml");
	// };

