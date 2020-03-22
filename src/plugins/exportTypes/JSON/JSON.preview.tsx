import * as React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { BuilderLayout } from '../../../components/builder/Builder.component';
import { generateSimple, generateComplex } from './JSON.generator';
import { JSONSettings } from './JSON.ui';
import './JSON.scss';

// TODO maybe provide these in the config definition & move codemirror/SyntaxHighlighter completely to the root.
// --- I guess the build would handle the importing of the CSS
require('codemirror/mode/javascript/javascript');
require('codemirror/mode/xml/xml');
require('codemirror/mode/markdown/markdown');

type PreviewProps = {
	numPreviewRows: number;
	builderLayout: BuilderLayout;
	exportTypeSettings: JSONSettings;
	showRowNumbers: boolean;
	enableLineWrapping: boolean;
	data: any;
	theme: string;
}

const Preview = ({ data, theme, exportTypeSettings, showRowNumbers, enableLineWrapping }: PreviewProps): JSX.Element | null => {
	const [code, setCode] = React.useState('');

	// TODO this is painting twice here, every time the export type settings change

	// rethink performance here
	React.useEffect(() => {
		const content = exportTypeSettings.dataStructureFormat === 'simple'
			? generateSimple(data, exportTypeSettings.stripWhitespace)
			: generateComplex(data, exportTypeSettings.stripWhitespace);
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
