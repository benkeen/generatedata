import * as React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { generateSimple, generateComplex } from './JSON.generator';
import './JSON.scss';
import { ETPreviewProps } from '../../../../types/exportTypes';

// TODO maybe provide these in the config definition & move codemirror/SyntaxHighlighter completely to the root.
// --- I guess the build would handle the importing of the CSS
require('codemirror/mode/javascript/javascript');
require('codemirror/mode/xml/xml');
require('codemirror/mode/markdown/markdown');


const Preview = ({ data, theme, exportTypeSettings, showRowNumbers, enableLineWrapping }: ETPreviewProps): JSX.Element | null => {
	const [code, setCode] = React.useState('');

	// TODO this is painting twice here, every time the export type settings change

	// rethink performance here
	React.useEffect(() => {
		const content = exportTypeSettings.dataStructureFormat === 'simple'
			? generateSimple(data, false)
			: generateComplex(data, false);
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
