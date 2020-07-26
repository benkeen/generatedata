import React from 'react';
import * as coreUtils from '../../utils/coreUtils';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { DataTypeFolder } from '../../_plugins';

export type CodeMirrorWrapperProps = {
	theme: string; // TODO
	codeMirrorMode: string;
	showLineNumbers: boolean;
	enableLineWrapping: boolean;
};

const CodeMirrorWrapper = (props: any): JSX.Element => {
	const { codeMirrorMode, theme, showLineNumbers, enableLineWrapping } = props;
	const [code, setCode] = React.useState("");

	React.useEffect(() => {
		// when to re-run!
		// add row -> easy
		// remove row -> easy
		// CHANGE row type -> ok
		// CHANGE row settings -> hard(ish)
		// change export type -> easy
		// change export type setting (which?) -> hard
		generatePreviewString(props)
			.then((str: string) => {
				setCode(str);
			});
	});

	return (
		<CodeMirror
			value={code}
			onBeforeChange={(editor, data, value) => setCode(value)}
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


export const generatePreviewString = (props: any) => {
	const { rows, columns, exportType, exportTypeSettings, rowDataTypes, loadedExportTypes } = props;

	return new Promise((resolve) => {
		const exportTypeWorker = coreUtils.getExportTypeWorker();

		exportTypeWorker.postMessage({
			rows,
			columns,
			exportType,
			exportTypeSettings,
			isFirstBatch: true,
			isLastBatch: true,
			workerResources: {
				coreUtils: coreUtils.getCoreWorkerUtils(),
				dataTypes: coreUtils.getDataTypeWorkerMap(rowDataTypes as DataTypeFolder[]),
				exportTypes: coreUtils.getExportTypeWorkerMap(loadedExportTypes)
			}
		});

		exportTypeWorker.onmessage = ({ data }: MessageEvent): void => {
			resolve(data);
		};
	});
};
