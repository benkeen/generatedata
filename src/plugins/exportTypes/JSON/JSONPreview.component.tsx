import * as React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { BuilderLayout } from '../../../components/builder/Builder.component';
import { generateSimple } from './JSON.generator';
import { JSONSettings } from './JSON.ui';
import './JSONPreview.scss';

require('codemirror/mode/javascript/javascript');
require('codemirror/mode/xml/xml');
require('codemirror/mode/markdown/markdown');

type PreviewProps = {
	numPreviewRows: number;
	builderLayout: BuilderLayout;
	exportTypeSettings: JSONSettings;
	showRowNumbers: boolean;
	data: any;
	theme: string;
}

const Preview = ({ data, theme, showRowNumbers }: PreviewProps): JSX.Element => {
	const [code, setCode] = React.useState('');

	React.useEffect(() => {
		// re-generate everything any time it changes, then do a diff on the changes. NOPE! WE need to do a diff
		// on the generation template to see what changed THERE.
		const content = generateSimple(data, false);
		setCode(content);
	}, [data, setCode]);

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
				readOnly: true
			}}
		/>
	);
};

export default Preview;






























