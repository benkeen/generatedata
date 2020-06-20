import * as React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { generateXML } from './XML.generator';
import './XML.scss';
import { ETPreviewProps } from '~types/exportTypes';

// TODO maybe provide these in the config definition & move codemirror/SyntaxHighlighter completely to the root?
require('codemirror/mode/xml/xml');

const Preview = ({ data, theme, exportTypeSettings, showRowNumbers, enableLineWrapping }: ETPreviewProps): JSX.Element | null => {
	const [code, setCode] = React.useState('');

	// rethink performance here
	React.useEffect(() => {
		const content = generateXML(data, exportTypeSettings);
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
