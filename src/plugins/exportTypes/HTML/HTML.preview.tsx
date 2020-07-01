import * as React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { generateTableFormat, generateUlFormat, generateDlFormat } from './HTML.generator';
import { ETPreviewProps } from '~types/exportTypes';

require('codemirror/mode/xml/xml');


const Preview = ({ data, theme, exportTypeSettings, showRowNumbers, enableLineWrapping }: ETPreviewProps): JSX.Element | null => {
	const [code, setCode] = React.useState('');

	React.useEffect(() => {
		let content = '';
		if (exportTypeSettings.exportFormat === 'table') {
			content = generateTableFormat(data);
		} else if (exportTypeSettings.exportFormat === 'ul') {
			content = generateUlFormat(data);
		} else if (exportTypeSettings.exportFormat === 'dl') {
			content = generateDlFormat(data);
		}
		setCode(content);
	}, [data, setCode, exportTypeSettings]);

	if (!data.rows.length) {
		return null;
	}

	return (
		<CodeMirror
			value={code}
			onBeforeChange={(value): void => {
				setCode(value);
			}}
			options={{
				mode: 'xml',
				theme,
				lineNumbers: showRowNumbers,
				lineWrapping: enableLineWrapping,
				readOnly: true
			}}
		/>
	);
};

export default Preview;
