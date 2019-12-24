import * as React from 'react';
import Button from '@material-ui/core/Button';
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
                <br />
                <Button onClick={() => setSubpage('results')} variant="contained" color="primary" disableElevation>Generate</Button>
            </>
        );
    } else {
        content = (
            <ResultsPanel />
        );
    }

	return (
		<>
            {content}
		</>
	);
};

export default GeneratePage;
