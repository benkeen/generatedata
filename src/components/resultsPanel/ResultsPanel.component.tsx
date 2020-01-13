import * as React from 'react';

export type ResultsPanelProps = {
    batchedData?: any;
}

const ResultsPanel = ({ batchedData }: ResultsPanelProps) => {
    return (
        <div style={{ border: '1px solid black', flex: 1 }}>
            {batchedData}
        </div>
    );
};

export default ResultsPanel;
