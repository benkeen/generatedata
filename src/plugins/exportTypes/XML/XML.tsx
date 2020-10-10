import * as React from 'react';
import styles from './XML.scss';
import { ETDownloadPacket, ETDownloadPacketResponse, ETSettings, ETState } from '~types/exportTypes';

export interface XMLSettings extends ETState {
	rootNodeName: string;
	recordNodeName: string;
	useCustomExportFormat: boolean;
	customFormat: string;
};

export const initialState: XMLSettings = {
	rootNodeName: 'records',
	recordNodeName: 'record',
	useCustomExportFormat: false,
	customFormat: '',
	isValid: true
};

export const Settings = ({ data, i18n, id, onUpdate }: ETSettings): JSX.Element => {
	const onChange = (prop: string, value: any): void => {
		onUpdate({
			...data,
			[prop]: value
		});
	};

	return (
		<>
			<div className={styles.row}>
				<label htmlFor={`${id}-rootNodeName`}>{i18n.rootNodeName}</label>
				<input
					type="text"
					id={`${id}-rootNodeName`}
					value={data.rootNodeName}
					onChange={(e): void => onChange('rootNodeName', e.target.value)}
				/>
			</div>
			<div className={styles.row}>
				<label htmlFor={`${id}-recordNodeName`}>{i18n.recordNodeName}</label>
				<input
					type="text"
					id={`${id}-recordNodeName`}
					value={data.recordNodeName}
					onChange={(e): void => onChange('recordNodeName', e.target.value)}
				/>
			</div>
		</>
	);
};

export const getCodeMirrorMode = (): string => 'text/html';

export const getDownloadFileInfo = ({ packetId }: ETDownloadPacket): ETDownloadPacketResponse => ({
	filename: `data-${packetId}.xml`,
	fileType: 'text/xml'
});


/*
const _defaultCustomXML = '{if $isFirstBatch}\n<?xml version="1.0" encoding="UTF-8" ?>\n' +
	'<records>\n' +
	'{/if}\n' +
	'{foreach $rowData as $row}\n' +
	'\t<record>\n' +
	'{foreach from=$colData item=col name=c}\n' +
	'\t\t<{$col}>{$row[$smarty.foreach.c.index]}</{$col}>\n' +
	'{/foreach}\n' +
	'\t</record>\n' +
	'{/foreach}\n' +
	'{if $isLastBatch}\n' +
	'</records>\n' +
	'{/if}';
*/


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


/*
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

<input type="checkbox" name="etXMLUseCustomExportFormat" id="etXMLUseCustomExportFormat" />
<label htmlFor="etXMLUseCustomExportFormat">{i18n.use_custom_xml_format}</label>
<input type="button" id="etXMLEditCustomFormat" value="edit" disabled={true} />

*/
