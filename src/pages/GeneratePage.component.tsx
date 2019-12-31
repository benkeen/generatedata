import * as React from 'react';
import Grid from '../components/grid/Grid.container';
import ResultsPanel from '../components/resultsPanel/ResultsPanel.container';

type SubPage = 'grid' | 'results';

const GeneratePage = () => {
    const [subPage, setSubpage] = React.useState<SubPage>('grid');

    let content;
    if (subPage === 'grid') {
        content = (
            <>
                <Grid />
            </>
        );
    } else {
        content = (
            <>
                <span onClick={() => setSubpage('grid')}>&laquo; back</span>
                <ResultsPanel />
            </>
        );
    }

	return (
		<>
            {content}
		</>
	);
};

export default GeneratePage;
