import React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import * as coreUtils from '~utils/coreUtils';
import { ExportTypeFolder } from '../../../../_plugins';
import { LoadedExportTypes } from '~utils/exportTypeUtils';

export type CodeMirrorWrapperProps = {
	previewRows: any;
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
		previewRows, columns, exportType, exportTypeSettings, codeMirrorMode, theme, showLineNumbers, loadedExportTypes,
		enableLineWrapping
	} = props;
	const [code, setCode] = React.useState("");

	React.useEffect(() => {
		if (!columns.length || !previewRows.length) {
			return;
		}
		generatePreviewString(props)
			.then((str: string) => {
				setCode(str);
			});
	}, [previewRows, columns, exportType, exportTypeSettings, loadedExportTypes]);

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
	const { previewRows, columns, exportType, exportTypeSettings, loadedExportTypes } = props;
	const exportTypeWorker = coreUtils.getExportTypeWorker('preview');

	return new Promise((resolve) => {
		coreUtils.performTask('exportTypeWorker', exportTypeWorker, {
			rows: previewRows,
			columns,
			exportType,
			exportTypeSettings: exportTypeSettings[exportType],
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
