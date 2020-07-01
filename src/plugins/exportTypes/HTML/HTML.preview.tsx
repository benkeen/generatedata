import * as React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
// import { generateSimple, generateComplex } from './HTML.generator';
import { ETPreviewProps } from '~types/exportTypes';

require('codemirror/mode/xml/xml');
// codeMirrorModes = array("xml", "smarty", "smartymixed", "htmlmixed", "css");


const Preview = ({ data, theme, exportTypeSettings, showRowNumbers, enableLineWrapping }: ETPreviewProps): JSX.Element | null => {
	const [code, setCode] = React.useState('');

	// TODO this is painting twice here, every time the export type settings change

	// rethink performance here
	React.useEffect(() => {
		const content = '';
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
				mode: 'application/ld+json',
				theme,
				lineNumbers: showRowNumbers,
				lineWrapping: enableLineWrapping,
				readOnly: true
			}}
		/>
	);
};

export default Preview;
