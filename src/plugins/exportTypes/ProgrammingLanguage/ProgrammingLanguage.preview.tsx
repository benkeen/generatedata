import * as React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { BuilderLayout } from '../../../core/builder/Builder.component';
import { ProgrammingLanguageState } from './ProgrammingLanguage.ui';
import { generateCSharp } from './languages/CSharp';
import { generateJS } from './languages/Javascript';
import { generatePerl } from './languages/Perl';

// "php", "perl", "htmlmixed", "xml", "javascript", "css", "clike", "ruby" <-- TODO these definitely need to be dynamic
require('codemirror/mode/javascript/javascript');
require('codemirror/mode/xml/xml');
require('codemirror/mode/markdown/markdown');
require('codemirror/mode/clike/clike');

type PreviewProps = {
	numPreviewRows: number;
	builderLayout: BuilderLayout;
	exportTypeSettings: ProgrammingLanguageState;
	showRowNumbers: boolean;
	enableLineWrapping: boolean;
	data: any;
	theme: string;
};

const Preview = ({ data, theme, showRowNumbers, enableLineWrapping, exportTypeSettings }: PreviewProps): JSX.Element | null => {
	const [mode, setMode] = React.useState('');
	const [code, setCode] = React.useState(''); // memoize

	React.useEffect(() => {
		let mode = '';
		let content = '';
		if (exportTypeSettings.language === 'JavaScript') {
			content = generateJS(data, exportTypeSettings);
			mode = 'text/javascript';
		} else if (exportTypeSettings.language === 'CSharp') {
			content = generateCSharp(data);
			mode = 'text/x-csharp';
		} else if (exportTypeSettings.language === 'Perl') {
			content = generatePerl(data);
			mode = 'text/perl';
		}
		setMode(mode);
		setCode(content);
	}, [data, exportTypeSettings, setCode]);

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
				mode,
				theme,
				lineNumbers: showRowNumbers,
				lineWrapping: enableLineWrapping,
				readOnly: true
			}}
		/>
	);
};

export default Preview;






























