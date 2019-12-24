import * as React from 'react';


export type ResultsPanelProps = {
    rows: any;
}

const ResultsPanel = ({ rows }: ResultsPanelProps) => {
    React.useEffect(() => {

    }, []);

    return (
        <div style={{ border: '1px solid black', flex: 1 }}>

        </div>
    );
};

export default ResultsPanel;
