import * as React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';


export type ResultsPanelProps = {
    batchedData?: any;
}

const ResultsPanel = ({ batchedData }: ResultsPanelProps) => {
    return (
        <div style={{ border: '1px solid black', flex: 1 }}>
            <SyntaxHighlighter language="json" style={docco}>{batchedData}</SyntaxHighlighter>
        </div>
    );
};

export default ResultsPanel;
