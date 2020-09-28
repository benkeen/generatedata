import React from 'react';
import * as coreUtils from '~utils/coreUtils';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { ExportTypeFolder } from '../../_plugins';
import { LoadedExportTypes } from '~utils/exportTypeUtils';

export type CodeMirrorWrapperProps = {
	rows: any;
	columns: any;
	exportType: ExportTypeFolder;
	exportTypeSettings: any;
	theme: string;
	codeMirrorMode: string;
	showLineNumbers: boolean;
	enableLineWrapping: boolean;
	loadedExportTypes: LoadedExportTypes;
};

const CodeMirrorWrapper = (props: CodeMirrorWrapperProps): JSX.Element => {
	const {
		rows, columns, exportType, exportTypeSettings, codeMirrorMode, theme, showLineNumbers, loadedExportTypes,
		enableLineWrapping
	} = props;
	const [code, setCode] = React.useState("");

	React.useEffect(() => {
		if (!columns.length || !rows.length) {
			return;
		}
		generatePreviewString(props)
			.then((str: string) => {
				setCode(str);
			});
	}, [rows, columns, exportType, exportTypeSettings, loadedExportTypes]);

	return (
		<CodeMirror
			value={code}
			onBeforeChange={(editor, data, value): void => setCode(value)}
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
	const { rows, columns, exportType, exportTypeSettings, loadedExportTypes } = props;
	const exportTypeWorker = coreUtils.getExportTypeWorker('preview');

	return new Promise((resolve) => {
		coreUtils.performTask('exportTypeWorker', exportTypeWorker, {
			rows,
			columns,
			exportType,
			exportTypeSettings,
			isFirstBatch: true,
			isLastBatch: true,
			stripWhitespace: false,
			workerResources: {
				workerUtils: coreUtils.getWorkerUtils(),
				exportTypes: coreUtils.getExportTypeWorkerMap(loadedExportTypes)
			}
		}, ({ data }: MessageEvent): void => {
			resolve(data);
		});
	});
};
