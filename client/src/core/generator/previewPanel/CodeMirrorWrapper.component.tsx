import React, { useEffect } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import * as coreUtils from '~utils/coreUtils';
import { ExportTypeFolder } from '../../../../_plugins';
import { LoadedExportTypes } from '~utils/exportTypeUtils';
import { getCountryData } from '~utils/countryUtils';
import { GeneratorLayout } from '~core/generator/Generator.component';
import { GenerationWorkerActionType } from '~core/generator/generation.types';

export type CodeMirrorWrapperProps = {
	previewRows: any;
	columns: any;
	exportType: ExportTypeFolder;
	exportTypeSettings: any;
	theme: string;
	codeMirrorMode: string;
	showLineNumbers: boolean;
	enableLineWrapping: boolean;
	generatorLayout: GeneratorLayout;
	loadedExportTypes: LoadedExportTypes;
};

const CodeMirrorWrapper = (props: CodeMirrorWrapperProps): JSX.Element => {
	const {
		previewRows, columns, exportType, exportTypeSettings, codeMirrorMode, theme, showLineNumbers, loadedExportTypes,
		generatorLayout, enableLineWrapping
	} = props;
	const [code, setCode] = React.useState('');
	const [codeMirrorInstance, setCodeMirrorInstance] = React.useState<any>(null);

	useEffect(() => {
		if (!columns.length || !previewRows.length) {
			return;
		}
		generatePreviewString(props)
			.then((str: string) => {
				setCode(str);
			});
	}, [previewRows, columns, exportType, exportTypeSettings, loadedExportTypes]);

	useEffect(() => {
		if (codeMirrorInstance) {
			codeMirrorInstance.refresh();
		}
	}, [generatorLayout]);

	return (
		<CodeMirror
			value={code}
			onBeforeChange={(editor, data, value): void => setCode(value)}
			editorDidMount={(editor): void => setCodeMirrorInstance(editor)}
			options={{
				mode: codeMirrorMode,
				theme,
				lineNumbers: showLineNumbers,
				lineWrapping: enableLineWrapping,
				readOnly: true
			}}
		/>
	);
};

export default CodeMirrorWrapper;

export const generatePreviewString = (props: any): Promise<any> => {
	const { previewRows, columns, exportType, exportTypeSettings, loadedExportTypes } = props;
	const generationWorker = coreUtils.getGenerationWorker('preview');

	return new Promise((resolve) => {
		coreUtils.performTask('exportTypeWorker', generationWorker, {
			action: GenerationWorkerActionType.ProcessExportTypesOnly,
			rows: previewRows,
			columns,
			exportType,
			exportTypeSettings: exportTypeSettings[exportType],
			isFirstBatch: true,
			isLastBatch: true,
			stripWhitespace: false,
			workerUtilsUrl: coreUtils.getWorkerUtilsUrl(),
			exportTypes: coreUtils.getExportTypeWorkerMap(loadedExportTypes),
			countryData: getCountryData()
		}, ({ data }: MessageEvent): void => {
			resolve(data);
		});
	});
};
