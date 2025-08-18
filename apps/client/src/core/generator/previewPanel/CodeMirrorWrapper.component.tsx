import React, { useEffect } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import * as coreUtils from '@generatedata/utils/dist/core';
import { getCountryData } from '@generatedata/utils/dist/country';
import { GeneratorLayout } from '@generatedata/types';
import { GenerationWorkerActionType } from '~core/generator/generation.types';
import C from '@generatedata/config/dist/constants';

export type CodeMirrorWrapperProps = {
	previewRows: any;
	columns: any;
	exportTypeWorkerUrl: string;
	exportTypeSettings: any;
	theme: string;
	codeMirrorMode: string;
	showLineNumbers: boolean;
	enableLineWrapping: boolean;
	generatorLayout: GeneratorLayout;
};

const CodeMirrorWrapper = (props: CodeMirrorWrapperProps): JSX.Element => {
	const {
		previewRows,
		columns,
		exportTypeSettings,
		codeMirrorMode,
		theme,
		showLineNumbers,
		generatorLayout,
		enableLineWrapping,
		exportTypeWorkerUrl
	} = props;
	const [code, setCode] = React.useState('');
	const [codeMirrorInstance, setCodeMirrorInstance] = React.useState<any>(null);

	useEffect(() => {
		if (!columns.length || !previewRows.length) {
			return;
		}
		generatePreviewString(props).then((str: string) => {
			setCode(str);
		});
	}, [previewRows, columns, exportTypeWorkerUrl, exportTypeSettings]);

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
	const { previewRows, columns, exportTypeSettings, exportTypeWorkerUrl } = props;
	const generationWorker = coreUtils.getGenerationWorker('preview');

	return new Promise((resolve) => {
		coreUtils.performTask(
			'exportTypeWorker',
			generationWorker,
			{
				action: GenerationWorkerActionType.ProcessExportTypeOnly,
				isFirstBatch: true,
				isLastBatch: true,
				batchSize: C.GENERATION_BATCH_SIZE,
				currentBatch: 1,
				rows: previewRows,
				columns,
				exportTypeSettings,
				stripWhitespace: false,
				workerUtilsUrl: coreUtils.getWorkerUtilsUrl(),
				exportTypeWorkerUrl,
				countryData: getCountryData()
			},
			({ data }: MessageEvent): void => {
				if (data.event === GenerationWorkerActionType.ExportTypeProcessed) {
					resolve(data.data);
				}
			}
		);
	});
};
