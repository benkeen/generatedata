import * as React from 'react';
import { BuilderLayout } from '../../../components/builder/Builder.component';
import { generateSimple } from './JSON.generator';
import './JSONPreview.scss';

import { Controlled as CodeMirror } from 'react-codemirror2';
import { JSONSettings } from './JSON.ui';
require('codemirror/mode/javascript/javascript');
require('codemirror/mode/xml/xml');
require('codemirror/mode/markdown/markdown');

type PreviewProps = {
    numPreviewRows: number;
    builderLayout: BuilderLayout;
    exportTypeSettings: JSONSettings;
    data: any;
}

const Preview = ({ numPreviewRows, builderLayout, exportTypeSettings: JSONSettings, data }: PreviewProps) => {
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
            onBeforeChange={(editor, data, value) => {
                setCode(value);
            }}
            options={{
                mode: 'application/ld+json',
                readOnly: true
            }}
        />
    );
};

export default Preview;






























