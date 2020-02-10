import * as React from 'react';
import Dropdown, { DropdownOption } from '../../../components/dropdown/Dropdown';

export type ProgrammingLanguageState = {
	language: 'CSharp' | 'JavaScript' | 'Perl' | 'PHP' | 'Ruby'
};

export const state: ProgrammingLanguageState = {
	language: 'Perl'
};

const options: DropdownOption[] = [
	{ value: 'CSharp', label: 'C# (anonymous object)' },
	{ value: 'JavaScript', label: 'JavaScript' },
	{ value: 'Perl', label: 'Perl' },
	{ value: 'PHP', label: 'PHP' },
	{ value: 'Ruby', label: 'Ruby' }
];

export const Settings = ({ i18n, data, onUpdate }: any): JSX.Element => {
	const onChange = (language: string): void => {
		onUpdate({
			...data,
			language
		});
	};
	return (
		<>
			{i18n.language}
			<Dropdown
				value={data.language}
				onChange={(item: any): any => onChange(item.value)}
				options={options}
			/>
		</>
	);
}

/*
	 * If the user is generating in-page data with this Export Type, enable the javascript
	 * mode for the in-page editor.
	var _onGenerate = function(msg) {
		if (msg.exportTarget != "inPage" || msg.exportType != "ProgrammingLanguage") {
			return;
		}

		switch ($("#etProgrammingLanguage_language")[0].value) {
			case "JavaScript":
				msg.editor.setOption("mode", "javascript");
				break;
			case "Perl":
				msg.editor.setOption("mode", "perl");
				break;
			case "PHP":
				msg.editor.setOption("mode", "php");
				break;
			case "Ruby":
				msg.editor.setOption("mode", "ruby");
				break;
		}
	};

	var _init = function() {
		var subscriptions = {};
		subscriptions[C.EVENT.GENERATE] = _onGenerate;
		subscriptions[C.EVENT.RESULT_TYPE.CHANGE] = _resultTypeChanged;
		manager.subscribe(MODULE_ID, subscriptions);
	};

	var _loadSettings = function(settings) {
		$("#etProgrammingLanguage_language").val(settings.language);
	};

	var _saveSettings = function() {
		return {
			language: $("#etProgrammingLanguage_language").val()
		};
	};

	var _resetSettings = function() {
		$("#etProgrammingLanguage_language").val("JavaScript");
	};

	var _resultTypeChanged = function(msg) {
		if (msg.newExportType == "ProgrammingLanguage") {
			$("#gdColTitleTop,#gdColTitleBottom").html(LANG.row_label);
		}
	};
*/

