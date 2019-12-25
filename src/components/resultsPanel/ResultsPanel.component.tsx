import * as React from 'react';


export type ResultsPanelProps = {
    batchedData?: any;
}

const ResultsPanel = ({ batchedData }: ResultsPanelProps) => {
    React.useEffect(() => {

    }, []);

    return (
        <div style={{ border: '1px solid black', flex: 1 }}>
            &nbsp;
        </div>
    );
};

export default ResultsPanel;
